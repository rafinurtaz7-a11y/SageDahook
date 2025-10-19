'use server';

/**
 * @fileOverview A flow for generating new content based on a knowledge base of documents.
 *
 * - generateContentFromDocuments - A function that generates new content based on a knowledge base of documents.
 * - GenerateContentFromDocumentsInput - The input type for the generateContentFromDocuments function.
 * - GenerateContentFromDocumentsOutput - The return type for the generateContentFromDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentFromDocumentsInputSchema = z.object({
  query: z.string().describe('The query to use to generate content.'),
  documentContext: z.array(z.string()).describe('The content of the documents to use as context.'),
  style: z.string().optional().describe('The desired style of the generated content (e.g., formal, informal, technical).'),
});
export type GenerateContentFromDocumentsInput = z.infer<typeof GenerateContentFromDocumentsInputSchema>;

const GenerateContentFromDocumentsOutputSchema = z.object({
  generatedContent: z.string().describe('The generated content.'),
});
export type GenerateContentFromDocumentsOutput = z.infer<typeof GenerateContentFromDocumentsOutputSchema>;

export async function generateContentFromDocuments(input: GenerateContentFromDocumentsInput): Promise<GenerateContentFromDocumentsOutput> {
  return generateContentFromDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentFromDocumentsPrompt',
  input: {schema: GenerateContentFromDocumentsInputSchema},
  output: {schema: GenerateContentFromDocumentsOutputSchema},
  prompt: `You are an AI assistant that generates content based on the provided document context and query.\n\nDocument Context:\n{{#each documentContext}}\n{{{this}}}\n{{/each}}\n\nQuery: {{{query}}}\n\n{{#if style}}\n  The user has requested that the generated content be in the following style: {{{style}}}\n{{/if}}\n\nGenerate the content:`,
});

const generateContentFromDocumentsFlow = ai.defineFlow(
  {
    name: 'generateContentFromDocumentsFlow',
    inputSchema: GenerateContentFromDocumentsInputSchema,
    outputSchema: GenerateContentFromDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
