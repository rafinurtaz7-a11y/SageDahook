import Header from '@/components/layout/header';
import { GenerationForm } from './generation-form';

export default function GeneratePage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Generate Content" />
      <main className="flex-1 p-6">
        <GenerationForm />
      </main>
    </div>
  );
}
