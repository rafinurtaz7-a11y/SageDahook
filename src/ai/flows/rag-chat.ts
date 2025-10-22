'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Document} from '@genkit-ai/ai/retriever';
import {devLocalRetrieverRef} from '@genkit-ai/dev-local-vectorstore';

const RagChatInputSchema = z.object({
  question: z.string(),
});

const RagChatOutputSchema = z.object({
  answer: z.string(),
});

const documentsRetriever = devLocalRetrieverRef('documents');

const ragChatFlow = ai.defineFlow(
  {
    name: 'ragChatFlow',
    inputSchema: RagChatInputSchema,
    outputSchema: RagChatOutputSchema,
  },
  async ({question}) => {
    const docs = await ai.retrieve({
      retriever: documentsRetriever,
      query: question,
      options: {k: 3},
    });

    const context = docs.map(doc => doc.content[0].text).join('\n---\n');

    const response = await ai.generate({
      prompt: `You are a helpful assistant that answers questions based on the provided document contents.

      Question: ${question}

      Document Contents:
      ${context}

      Answer: `,
      model: 'ollama/llama3',
    });

    return {answer: response.text};
  }
);

export async function ragChat(
  input: z.infer<typeof RagChatInputSchema>
): Promise<z.infer<typeof RagChatOutputSchema>> {
  return ragChatFlow(input);
}
