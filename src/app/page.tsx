import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, MessagesSquare, Sparkles } from 'lucide-react';
import Header from '@/components/layout/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const welcomeImage = PlaceHolderImages.find(p => p.id === 'dashboard-welcome');

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" />
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome to OfflineSage</h1>
          <p className="text-muted-foreground">Your personal, offline AI assistant.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Documents</div>
              <p className="text-xs text-muted-foreground">in your knowledge base</p>
              <Button asChild size="sm" className="mt-4">
                <Link href="/documents">Browse Documents</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Chat</CardTitle>
              <MessagesSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready to Help</div>
              <p className="text-xs text-muted-foreground">Ask questions about your data</p>
              <Button asChild size="sm" className="mt-4">
                <Link href="/chat">Start Chatting</Link>
              </Button>
            </CardContent>
          </Card>
          {welcomeImage && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Inspiration</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={welcomeImage.imageUrl}
                        alt={welcomeImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={welcomeImage.imageHint}
                    />
                  </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
