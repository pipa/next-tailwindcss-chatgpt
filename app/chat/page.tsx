'use client';

import React from "react";
import ComposeBox from "./ComposeBox";
import ConversationHeader from './ConversationHeader';
import Conversation from './Conversation';

const Page: React.FC = () => {
  return (
    <main className="p-10 h-full">
      <ConversationHeader />

      <Conversation />

      <ComposeBox />
    </main>
  )
}

export default Page;