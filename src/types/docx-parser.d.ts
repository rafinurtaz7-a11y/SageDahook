declare module 'docx-parser' {
  const docxParser: {
    parse: (buffer: Buffer) => Promise<{ text: string }>;
  };
  export default docxParser;
}
