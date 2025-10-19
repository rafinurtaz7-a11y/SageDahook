'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getSummary } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const initialState = {
  message: '',
  summary: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Summarize
    </Button>
  );
}

export function SummaryForm({ documentContent }: { documentContent: string }) {
  const [state, formAction] = useFormState(getSummary, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(textAreaRef.current){
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [state.summary]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Summarization</CardTitle>
        <CardDescription>Generate a summary of this document. You can also specify a style.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} ref={formRef} className="space-y-4">
          <input type="hidden" name="documentContent" value={documentContent} />
          <div className="flex items-center gap-4">
            <Select name="style" defaultValue="formal">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="informal">Informal</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="bullet-points">Bullet Points</SelectItem>
              </SelectContent>
            </Select>
            <SubmitButton />
          </div>
        </form>
        
        {(state.summary || (state.message !== '' && state.message !== 'Success')) && (
            <div className="mt-6 space-y-4">
                {state.summary && (
                    <Textarea
                        ref={textAreaRef}
                        readOnly
                        value={state.summary}
                        className="text-sm min-h-[10rem] resize-none overflow-hidden"
                    />
                )}
                {state.message && state.message !== 'Success' && (
                    <p className="text-sm text-destructive">{state.message}</p>
                )}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
