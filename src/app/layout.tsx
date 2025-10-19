import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import MainNav from '@/components/layout/main-nav';
import { Logo } from '@/components/logo';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'OfflineSage',
  description: 'Your local AI assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar variant="inset" collapsible="icon">
              <div className="flex h-14 items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
                <Logo />
              </div>
              <MainNav />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
