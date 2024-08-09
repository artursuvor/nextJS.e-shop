import React from 'react';
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fake e-shop',
  description: 'My representation of e-shop using next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
