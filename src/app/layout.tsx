import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Mohan Kilari | Embedded Systems & IoT Developer',
  description: 'Portfolio of Mohan Kilari, an Embedded Systems and IoT Developer with a background in full-stack and Shopify development.',
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
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-code antialiased min-h-screen bg-background text-foreground')}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          themes={['dark', 'matrix', 'dracula', 'solarized-dark']}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
