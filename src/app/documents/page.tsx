import FileUpload from '@/components/documents/file-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/header';

export default function DocumentsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Documents" />
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Upload your documents to create a knowledge base for the AI to reference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
