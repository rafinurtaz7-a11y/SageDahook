import {ai} from '../genkit';
import * as z from 'zod';

export const longFormTextGenerationFlow = ai.defineFlow(
  {
    name: 'longFormTextGenerationFlow',
    inputSchema: z.object({
      prompt: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({prompt}) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'ollama/llama3',
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  },
);
