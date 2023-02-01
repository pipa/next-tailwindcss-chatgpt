// These styles apply to every route in the application
import React from 'react';
import './globals.css';
import Head from './head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body className="bg-default h-screen">
        {children}
      </body>
    </html>
  );
}
