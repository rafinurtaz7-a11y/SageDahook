import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/generate-content-from-documents.ts';
import '@/ai/flows/customize-output-style.ts';
import '@/ai/flows/answer-question.ts';