'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateContent } from '@/app/actions';
import { documents } from '@/lib/documents';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const initialState = {
  message: '',
  generatedContent: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Content
    </Button>
  );
}

export function GenerationForm() {
  const [state, formAction] = useFormState(generateContent, initialState);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form action={formAction} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Generation</CardTitle>
            <CardDescription>Generate new content based on a query and selected documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="query">Your Query</Label>
              <Textarea id="query" name="query" placeholder="e.g., 'Write a blog post comparing Project Management and Machine Learning'" required />
            </div>
            <div>
              <Label>Source Documents</Label>
              <div className="space-y-2 rounded-md border p-4 max-h-48 overflow-y-auto">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center space-x-2">
                    <Checkbox id={`doc-${doc.id}`} name="documentIds" value={doc.id} />
                    <Label htmlFor={`doc-${doc.id}`} className="font-normal flex items-center gap-2 cursor-pointer">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {doc.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
             <div>
              <Label htmlFor="style">Output Style</Label>
              <Select name="style" defaultValue="formal">
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="informal">Informal</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <SubmitButton />
      </form>
      <Card>
        <CardHeader>
          <CardTitle>Generated Output</CardTitle>
        </CardHeader>
        <CardContent>
            {(state.generatedContent || (state.message !== '' && state.message !== 'Success')) ? (
                <div className="space-y-4">
                    {state.generatedContent && (
                        <Textarea
                            readOnly
                            value={state.generatedContent}
                            className="h-[calc(100vh-21rem)] text-sm resize-none"
                        />
                    )}
                    {state.message && state.message !== 'Success' && (
                        <p className="text-sm text-destructive">{state.message}</p>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground border-2 border-dashed rounded-lg p-6 text-center">
                    Your generated content will appear here.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
