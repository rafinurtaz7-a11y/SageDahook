'use server';

import {z} from 'zod';
import {summarizeDocument} from '@/ai/flows/summarize-document';
import {answerQuestion} from '@/ai/flows/answer-question';
import {longFormTextGenerationFlow} from '@/ai/flows/generate-long-form-text';
import {imageGenerationFlow} from '@/ai/flows/generate-image';
import {documents} from '@/lib/documents';

// --- Summarization Action ---
const summarizeSchema = z.object({
  documentContent: z.string(),
  style: z.string().optional(),
});

type SummaryState = {
  message: string;
  summary: string;
};

export async function getSummary(
  prevState: SummaryState,
  formData: FormData,
): Promise<SummaryState> {
  const validatedFields = summarizeSchema.safeParse({
    documentContent: formData.get('documentContent'),
    style: formData.get('style') || undefined,
  });

  if (!validatedFields.success) {
    return {message: 'Invalid form data.', summary: ''};
  }

  try {
    const {summary} = await summarizeDocument(validatedFields.data);
    return {message: 'Success', summary};
  } catch (e) {
    return {
      message: 'An error occurred while generating the summary.',
      summary: '',
    };
  }
}

// --- Chat Action ---
const chatSchema = z.object({
  question: z.string(),
});

export async function getChatAnswer(question: string): Promise<string> {
  const validatedFields = chatSchema.safeParse({question});

  if (!validatedFields.success) {
    return 'Invalid question.';
  }

  try {
    const documentContents = documents.map((doc) => doc.content);
    const {answer} = await answerQuestion({
      question: validatedFields.data.question,
      documentContents,
    });
    return answer;
  } catch (e) {
    return 'Sorry, I encountered an error and could not answer your question.';
  }
}

// --- Long Form Text Generation Action ---
export async function generateLongFormText(prompt: string): Promise<string> {
  try {
    const generatedText = await longFormTextGenerationFlow({prompt});
    return generatedText;
  } catch (e) {
    return 'An error occurred while generating content.';
  }
}

// --- Image Generation Action ---
export async function generateImage(prompt: string): Promise<string> {
  try {
    const imageUrl = await imageGenerationFlow({prompt});
    return imageUrl;
  } catch (e) {
    return 'An error occurred while generating the image.';
  }
}
