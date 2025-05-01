"use client";
import '../css/home.css';
import { NextAuthProvider } from '../../providers/NextAuthProvider';

// Don't use Google Fonts during build to avoid certificate issues
// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='overflow-x-hidden'>
      <body className='overflow-hidden relative font-sans'>
        <NextAuthProvider>
          <main className='relative overflow-hidden'>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
