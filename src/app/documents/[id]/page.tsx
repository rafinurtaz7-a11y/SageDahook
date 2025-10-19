import { notFound } from 'next/navigation';
import { documents } from '@/lib/documents';
import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SummaryForm } from './summary-form';

type Props = {
  params: { id: string };
};

export default function DocumentDetailPage({ params }: Props) {
  const doc = documents.find((d) => d.id === params.id);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={doc.title} />
      <main className="flex-1 p-6 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>Document Content</CardTitle>
                <CardDescription>Created on {new Date(doc.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-[calc(100vh-22rem)] rounded-md border p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{doc.content}</p>
                </ScrollArea>
              </CardContent>
            </Card>
        </div>
        <div className="flex flex-col gap-6">
            <SummaryForm documentContent={doc.content} />
        </div>
      </main>
    </div>
  );
}
