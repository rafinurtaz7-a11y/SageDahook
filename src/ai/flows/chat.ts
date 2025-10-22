'use server';
import {ai, dynamicModel} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string(),
});

const ChatOutputSchema = z.object({
  message: z.string(),
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({message}) => {
    const response = await ai.generate({
      prompt: message,
      model: dynamicModel,
    });
    return {message: response.text};
  }
);

export async function chat(
  input: z.infer<typeof ChatInputSchema>
): Promise<z.infer<typeof ChatOutputSchema>> {
  return chatFlow(input);
}
