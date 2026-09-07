import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noted — Asisten meetingmu boss, noted!',
  description: 'AI Meeting Intelligence & Acoustic Diarization Assistant. Siap mencatat seluruh rapat dengan presisi dan loyalitas tinggi, Boss!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-50 text-brand-900 font-sans min-h-screen flex flex-col antialiased selection:bg-accent-100 selection:text-accent-900">
        {children}
      </body>
    </html>
  );
}
