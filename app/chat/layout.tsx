'use client'

import React from "react";
import { ChatProvider } from "./state";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      {children}
    </ChatProvider>
  );
}
