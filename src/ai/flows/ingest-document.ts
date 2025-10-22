'use server';
import {ai, llama3} from '@/ai/genkit';
import {z} from 'genkit';
import {Document} from '@genkit-ai/ai/retriever';
import {chunk} from 'llm-chunk';
import docxParser from 'docx-parser';
import {devLocalIndexerRef} from '@genkit-ai/dev-local-vectorstore';

const IngestDocumentInputSchema = z.object({
  content: z.string(),
  contentType: z.string(),
});

const documentsIndexer = devLocalIndexerRef('documents');

const ingestDocumentFlow = ai.defineFlow(
  {
    name: 'ingestDocumentFlow',
    inputSchema: IngestDocumentInputSchema,
    outputSchema: z.void(),
  },
  async ({content, contentType}) => {
    let text: string;

    if (
      contentType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const data = await docxParser.parse(Buffer.from(content, 'base64'));
      text = data.text;
    } else {
      text = Buffer.from(content, 'base64').toString('utf-8');
    }

    const chunks = chunk(text, {minLength: 100, maxLength: 1000});

    const documents = chunks.map(
      (chunk, i) =>
        new Document({
          content: [{text: chunk}],
          metadata: {chunk: i},
        })
    );

    await ai.index({
      indexer: documentsIndexer,
      documents,
      embedder: llama3,
    });
  }
);

export async function ingestDocument(
  input: z.infer<typeof IngestDocumentInputSchema>
): Promise<void> {
  return ingestDocumentFlow(input);
}
