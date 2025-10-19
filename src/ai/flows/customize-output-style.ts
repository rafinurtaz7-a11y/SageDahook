'use server';

/**
 * @fileOverview Allows users to customize the output style (e.g., formal, informal, technical) for generated content.
 *
 * - customizeOutputStyle - A function that takes input content and a style, and returns generated content in the specified style.
 * - CustomizeOutputStyleInput - The input type for the customizeOutputStyle function.
 * - CustomizeOutputStyleOutput - The return type for the customizeOutputStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeOutputStyleInputSchema = z.object({
  content: z.string().describe('The content to be styled.'),
  style: z.string().describe('The desired style of the output (e.g., formal, informal, technical).'),
});
export type CustomizeOutputStyleInput = z.infer<typeof CustomizeOutputStyleInputSchema>;

const CustomizeOutputStyleOutputSchema = z.object({
  styledContent: z.string().describe('The content styled according to the specified style.'),
});
export type CustomizeOutputStyleOutput = z.infer<typeof CustomizeOutputStyleOutputSchema>;

export async function customizeOutputStyle(input: CustomizeOutputStyleInput): Promise<CustomizeOutputStyleOutput> {
  return customizeOutputStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeOutputStylePrompt',
  input: {schema: CustomizeOutputStyleInputSchema},
  output: {schema: CustomizeOutputStyleOutputSchema},
  prompt: `You are a content styler who can transform content into various styles based on user requests.

  The user will provide the content and the desired style.
  Your task is to restyle the content according to the specified style.

  Content: {{{content}}}
  Style: {{{style}}}

  Styled Content:`, 
});

const customizeOutputStyleFlow = ai.defineFlow(
  {
    name: 'customizeOutputStyleFlow',
    inputSchema: CustomizeOutputStyleInputSchema,
    outputSchema: CustomizeOutputStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
