import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DEALPORT — Admin Dashboard & Product Management',
  description: 'Full-stack eCommerce Admin Shell & Product API Built with Next.js App Router and NestJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
