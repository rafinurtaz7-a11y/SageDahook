import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm sticky top-0 z-10">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:text-xl truncate">{title}</h1>
    </header>
  );
}
