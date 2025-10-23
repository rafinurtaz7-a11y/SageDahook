'use server';
import {ai, dynamicModel} from '@/ai/genkit';
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
    console.log('[ingestDocumentFlow] Starting document ingestion...');
    let text: string;

    try {
      console.log(`[ingestDocumentFlow] Content type: ${contentType}`);
      if (
        contentType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        console.log('[ingestDocumentFlow] Parsing DOCX file...');
        const data = await docxParser.parse(Buffer.from(content, 'base64'));
        text = data.text;
        console.log('[ingestDocumentFlow] DOCX parsing complete.');
      } else {
        console.log('[ingestDocumentFlow] Parsing plain text file...');
        text = Buffer.from(content, 'base64').toString('utf-8');
        console.log('[ingestDocumentFlow] Plain text parsing complete.');
      }

      console.log('[ingestDocumentFlow] Chunking document...');
      const chunks = chunk(text, {minLength: 100, maxLength: 1000});
      console.log(`[ingestDocumentFlow] Created ${chunks.length} chunks.`);

      const documents = chunks.map(
        (chunk, i) =>
          new Document({
            content: [{text: chunk}],
            metadata: {chunk: i},
          })
      );
      console.log('[ingestDocumentFlow] Document objects created.');

      console.log('[ingestDocumentFlow] Indexing documents... This may take a moment.');
      await ai.index({
        indexer: documentsIndexer,
        documents,
        embedder: dynamicModel,
      });
      console.log('[ingestDocumentFlow] Document indexing complete.');
    } catch (error) {
      console.error('[ingestDocumentFlow] An error occurred:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }
);

export async function ingestDocument(
  input: z.infer<typeof IngestDocumentInputSchema>
): Promise<void> {
  return ingestDocumentFlow(input);
}
