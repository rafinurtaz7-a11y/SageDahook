'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadDocument } from '@/app/actions';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:bg-opacity-50"
    >
      {pending ? <Loader2 className="animate-spin" /> : 'Upload'}
    </button>
  );
}

export default function FileUpload() {
  const [state, formAction] = useActionState(uploadDocument, initialState);
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      console.log('Toast message:', state.message);
      toast({
        title: 'Upload Status',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFile(file);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form action={formAction}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragActive ? 'border-primary' : 'border-border'
        }`}
      >
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            {file ? (
              file.name
            ) : (
              <span>
                Drag and drop your files here, or{' '}
                <span className="font-semibold text-primary">
                  click to browse
                </span>
                .
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            TXT or DOCX files are supported.
          </p>
          <input
            id="file-upload"
            name="file"
            type="file"
            className="sr-only"
            onChange={handleChange}
            accept=".txt,.docx"
          />
        </label>
      </div>
      {file && <SubmitButton />}
    </form>
  );
}
