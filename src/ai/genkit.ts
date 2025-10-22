import {genkit} from 'genkit';
import {ollama} from 'genkitx-ollama';
import {devLocalVectorstore} from '@genkit-ai/dev-local-vectorstore';

export const llama3 = ollama.model('llama3');

export const ai = genkit({
  plugins: [
    ollama({
      models: [llama3],
      serverAddress: 'http://127.0.0.1:11434',
    }),
    devLocalVectorstore([
      {
        indexName: 'documents',
        embedder: llama3,
      },
    ]),
  ],
  model: 'ollama/llama3',
});
