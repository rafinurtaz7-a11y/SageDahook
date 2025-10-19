'use server';

import { z } from 'zod';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { chat } from '@/ai/flows/chat';
import { generateContentFromDocuments } from '@/ai/flows/generate-content-from-documents';

// --- Summarization Action ---
const summarizeSchema = z.object({
  documentContent: z.string(),
  style: z.string().optional(),
});

type SummaryState = {
  message: string;
  summary: string;
};

export async function getSummary(prevState: SummaryState, formData: FormData): Promise<SummaryState> {
  const validatedFields = summarizeSchema.safeParse({
    documentContent: formData.get('documentContent'),
    style: formData.get('style') || undefined,
  });

  if (!validatedFields.success) {
    return { message: 'Invalid form data.', summary: '' };
  }

  try {
    const { summary } = await summarizeDocument(validatedFields.data);
    return { message: 'Success', summary };
  } catch (e) {
    return { message: 'An error occurred while generating the summary.', summary: '' };
  }
}

// --- Chat Action ---
const chatSchema = z.object({
  question: z.string(),
});

export async function getChatAnswer(question: string): Promise<string> {
  const validatedFields = chatSchema.safeParse({ question });

  if (!validatedFields.success) {
    return 'Invalid question.';
  }
  
  try {
    const { message } = await chat({
      message: validatedFields.data.question,
    });
    return message;
  } catch (e) {
    return 'Sorry, I encountered an error and could not answer your question.';
  }
}


// --- Generation Action ---
const generateSchema = z.object({
  query: z.string(),
  documentIds: z.array(z.string()),
  style: z.string().optional(),
});

type GenerationState = {
  message: string;
  generatedContent: string;
};

export async function generateContent(prevState: GenerationState, formData: FormData): Promise<GenerationState> {
  return { message: 'This feature is not yet implemented.', generatedContent: '' };
}
