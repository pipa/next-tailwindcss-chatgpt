// These styles apply to every route in the application
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
      <body className="flex flex-col items-center justify-center w-screen min-h-screen bg-default text-gray-800 p-10">
        {children}
      </body>
    </html>
  );
}
