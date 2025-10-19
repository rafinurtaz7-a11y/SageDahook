import {genkit} from 'genkit';
import {ollama} from 'genkitx-ollama';

export const ai = genkit({
  plugins: [
    ollama({
      models: [{name: 'llama3'}],
      serverAddress: 'http://127.0.0.1:11434',
    }),
  ],
  model: 'ollama/llama3',
});
