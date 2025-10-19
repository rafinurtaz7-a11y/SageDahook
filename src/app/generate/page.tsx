'use client';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import Header from '@/components/layout/header';
import {generateLongFormText, generateImage} from '../actions';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useOllamaStatus} from '@/hooks/useOllamaStatus';

export default function GeneratePage() {
  const {isOllamaRunning, isLoading} = useOllamaStatus();

  const [textPrompt, setTextPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isTextLoading, setIsTextLoading] = useState(false);

  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleGenerateText = async () => {
    setIsTextLoading(true);
    const result = await generateLongFormText(textPrompt);
    setGeneratedText(result);
    setIsTextLoading(false);
  };

  const handleGenerateImage = async () => {
    setIsImageLoading(true);
    const result = await generateImage(imagePrompt);
    setGeneratedImage(result);
    setIsImageLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Checking Ollama server status...</p>
      </div>
    );
  }

  if (!isOllamaRunning) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Header title="Generate Content" />
        <main className="flex-1 p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ollama Server Not Running</h2>
          <p>
            To generate content, you need to have the Ollama server running on
            your local machine.
          </p>
          <p>
            Please visit{' '}
            <a
              href="https://ollama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              ollama.ai
            </a>{' '}
            to download and install it.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Generate Content" />
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Long-Form Text Generation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="Enter your prompt for long-form text generation..."
              className="h-48"
            />
            <Button onClick={handleGenerateText} disabled={isTextLoading}>
              {isTextLoading ? 'Generating...' : 'Generate Text'}
            </Button>
            <div className="border rounded-lg p-4 h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{generatedText}</pre>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Image Generation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter your prompt for image generation..."
              className="h-48"
            />
            <Button onClick={handleGenerateImage} disabled={isImageLoading}>
              {isImageLoading ? 'Generating...' : 'Generate Image'}
            </Button>
            <div className="border rounded-lg p-4 h-96 flex items-center justify-center">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-h-full max-w-full"
                />
              ) : (
                <p>Generated image will appear here.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
