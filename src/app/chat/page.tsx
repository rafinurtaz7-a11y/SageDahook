'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { getChatAnswer } from '@/app/actions';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const answer = await getChatAnswer(input);
      const assistantMessage: Message = { role: 'assistant', content: answer };
      setMessages((prev) => [...prev, assistantMessage]);
    });
  };

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTo(0, viewportRef.current.scrollHeight);
    }
  }, [messages, isPending]);

  return (
    <div className="flex flex-col h-full">
      <Header title="Chat with your Knowledge Base" />
      <div className="flex-1 p-6 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-6">
            <ScrollArea className="flex-1 -mx-6" viewportRef={viewportRef}>
              <div className="px-6 space-y-6">
                  {messages.map((message, index) => (
                  <div
                      key={index}
                      className={cn(
                      'flex items-start gap-4',
                      message.role === 'user' ? 'justify-end' : ''
                      )}
                  >
                      {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 border">
                          <AvatarFallback><BrainCircuit size={16} /></AvatarFallback>
                      </Avatar>
                      )}
                      <div
                      className={cn(
                          'max-w-xl rounded-lg p-3 text-sm shadow-sm',
                          message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border'
                      )}
                      >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'user' && (
                          <Avatar className="h-8 w-8 border">
                              <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                      )}
                  </div>
                  ))}
                  {isPending && (
                      <div className="flex items-start gap-4">
                          <Avatar className="h-8 w-8 border">
                              <AvatarFallback><BrainCircuit size={16} /></AvatarFallback>
                          </Avatar>
                          <div className="bg-card border rounded-lg p-3 shadow-sm">
                              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          </div>
                      </div>
                  )}
              </div>
            </ScrollArea>
            <div className="pt-6 -mx-6 -mb-6 border-t bg-background rounded-b-lg">
                <div className="px-6">
                    <form onSubmit={handleSubmit} className="relative">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your documents..."
                        className="pr-20"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e as any);
                            }
                        }}
                    />
                    <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2" disabled={isPending || !input.trim()}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                    </form>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
