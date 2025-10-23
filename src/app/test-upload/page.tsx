// src/app/test-upload/page.tsx
'use client';

import { uploadDocument } from '@/app/actions';
import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';

const initialState = {
  message: '',
};

function SubmitButton() {
  return <button type="submit">Uploading...</button>;
}

export default function TestUploadPage() {
  const [state, formAction] = useFormState(uploadDocument, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Create a dummy file and submit the form automatically
    const createAndSubmitForm = async () => {
      // The large file is on the server, so we fetch it first
      // This is a bit of a workaround for the test environment.
      const response = await fetch('/large_test_file.txt');
      const text = await response.text();
      const file = new File([text], 'large_test_file.txt', { type: 'text/plain' });

      const formData = new FormData();
      formData.append('file', file);

      // We need to manually call the form action with the form data
      // A direct formRef.current.submit() won't work with server actions in this context.
      const newSstate = await uploadDocument(initialState, formData);
      console.log('Server action finished:', newSstate.message);
    };

    createAndSubmitForm();
  }, []);

  return (
    <div>
      <h1>Testing File Upload</h1>
      <p>This page will automatically trigger a file upload.</p>
      <form ref={formRef} action={formAction}>
        {/* The input is hidden, we'll populate it via script */}
        <input type="file" name="file" style={{ display: 'none' }} />
        <SubmitButton />
      </form>
      {state.message && <p>{state.message}</p>}
    </div>
  );
}
