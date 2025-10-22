import { genkit } from 'genkit';
import { ollama } from 'genkitx-ollama';
import { devLocalVectorstore } from '@genkit-ai/dev-local-vectorstore';
import fs from 'fs';
import path from 'path';

// Define a type for the config for type safety
interface AppConfig {
  model: string;
}

// Function to read and validate the config file
function readConfig(): AppConfig {
  const configPath = path.resolve(process.cwd(), 'config.json');
  try {
    if (fs.existsSync(configPath)) {
      const rawConfig = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(rawConfig);
      if (config.model && typeof config.model === 'string') {
        return config;
      }
    }
  } catch (error) {
    console.error('Error reading or parsing config.json:', error);
  }
  // Fallback to a default if the config is missing or invalid
  console.warn('config.json not found or invalid. Falling back to default model "deepseek-llm".');
  console.warn('Please run "npm run setup" to configure your model.');
  return { model: 'deepseek-llm' };
}

const config = readConfig();

// Use the model name from the config file
export const dynamicModel = ollama.model(config.model);

export const ai = genkit({
  plugins: [
    ollama({
      models: [dynamicModel],
      serverAddress: 'http://1.0.0.1:11434',
    }),
    devLocalVectorstore([
      {
        indexName: 'documents',
        embedder: dynamicModel,
      },
    ]),
  ],
  model: `ollama/${config.model}`,
});
