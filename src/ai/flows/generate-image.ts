import {ai} from '../genkit';
import * as z from 'zod';

export const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: z.object({
      prompt: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({prompt}) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'ollama/llava',
    });

    return llmResponse.text();
  },
);
