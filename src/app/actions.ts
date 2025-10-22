'use server';

import { z } from 'zod';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { chat } from '@/ai/flows/chat';
import { generateContentFromDocuments } from '@/ai/flows/generate-content-from-documents';
import { ingestDocument } from '@/ai/flows/ingest-document';

// --- Document Ingestion Action ---
const ingestSchema = z.object({
  file: z.instanceof(File),
});

type IngestState = {
  message: string;
};

export async function uploadDocument(prevState: IngestState, formData: FormData): Promise<IngestState> {
  console.log('uploadDocument called');
  const validatedFields = ingestSchema.safeParse({
    file: formData.get('file'),
  });

  if (!validatedFields.success) {
    console.log('Validation failed');
    return { message: 'Invalid form data.' };
  }

  try {
    const { file } = validatedFields.data;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const content = buffer.toString('base64');

    await ingestDocument({
      content,
      contentType: file.type,
    });

    console.log('Successfully uploaded document.');
    return { message: 'Successfully uploaded document.' };
  } catch (e) {
    console.log('Error uploading document:', e);
    return { message: 'An error occurred while uploading the document.' };
  }
}

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

import { ragChat } from '@/ai/flows/rag-chat';

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
    const { answer } = await ragChat({
      question: validatedFields.data.question,
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
  return { message: 'This feature is not yet implemented.', generatedContent: '' };
}
