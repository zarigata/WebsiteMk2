import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBasePath } from '@/lib/pathUtils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Catchy - Digital Marketing Agency in Saudi Arabia',
  description: 'Catchy is a leading digital marketing agency in Saudi Arabia, helping businesses grow their online presence with innovative strategies and creative solutions.',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: getBasePath(),
  },
  openGraph: {
    title: 'Catchy - Digital Marketing Agency in Saudi Arabia',
    description: 'Catchy is a leading digital marketing agency in Saudi Arabia, helping businesses grow their online presence with innovative strategies and creative solutions.',
    url: getBasePath(),
    siteName: 'Catchy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catchy - Digital Marketing Agency in Saudi Arabia',
    description: 'Catchy is a leading digital marketing agency in Saudi Arabia, helping businesses grow their online presence with innovative strategies and creative solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${getBasePath()}/favicon.ico`} />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
