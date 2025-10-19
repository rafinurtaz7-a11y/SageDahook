'use server';

import { z } from 'zod';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { answerQuestion } from '@/ai/flows/answer-question';
import { generateContentFromDocuments } from '@/ai/flows/generate-content-from-documents';
import { documents } from '@/lib/documents';

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
    const documentContents = documents.map(doc => doc.content);
    const { answer } = await answerQuestion({
      question: validatedFields.data.question,
      documentContents,
    });
    return answer;
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
  const documentIds = formData.getAll('documentIds') as string[];
  const validatedFields = generateSchema.safeParse({
    query: formData.get('query'),
    documentIds: documentIds,
    style: formData.get('style') || undefined,
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid form data.', generatedContent: '' };
  }
  
  const query = validatedFields.data.query as string;
  if(!query?.trim()){
    return { message: 'Query cannot be empty.', generatedContent: '' };
  }

  try {
    const documentContext = documents
        .filter(doc => validatedFields.data.documentIds.includes(doc.id))
        .map(doc => `Document: ${doc.title}\nContent: ${doc.content}`);
    
    if (documentContext.length === 0) {
        return { message: 'Please select at least one document.', generatedContent: '' };
    }

    const { generatedContent } = await generateContentFromDocuments({
        query: validatedFields.data.query,
        documentContext,
        style: validatedFields.data.style,
    });
    return { message: 'Success', generatedContent };
  } catch (e) {
    return { message: 'An error occurred while generating content.', generatedContent: '' };
  }
}
