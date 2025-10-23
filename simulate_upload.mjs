// simulate_upload.mjs
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function uploadTestFile() {
  const filePath = path.resolve(process.cwd(), 'large_test_file.txt');
  if (!fs.existsSync(filePath)) {
    console.error('Test file not found!');
    return;
  }

  // In a real server action, the file is the only thing in the body.
  const fileBuffer = fs.readFileSync(filePath);

  console.log('Simulating file upload to the server action...');
  try {
    // Server actions are just POST requests to the page URL.
    // However, simulating the exact headers and Next.js specific fields is complex.
    // It's much easier to trigger this from a test page or test script within the Next.js environment.
    // For now, I'll try a direct POST to the documents page, which is where the upload form lives.

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    // The Next.js server action is implicitly linked to the form on the page.
    // A direct fetch like this might not work as expected without the right headers.
    // Let's target the page where the form is located.
    const response = await fetch('http://localhost:9002/documents', {
      method: 'POST',
      body: form,
      headers: {
        ...form.getHeaders(),
        // Next.js server actions expect specific headers, which might be hard to replicate.
        // Let's see what the server's reaction is.
      },
    });

    const result = await response.text();
    console.log('Server response:', result);

  } catch (error) {
    console.error('Upload simulation failed:', error);
  }
}

uploadTestFile();
