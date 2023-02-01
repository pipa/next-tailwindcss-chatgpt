'use client';

import { marked } from "marked";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useChat } from "./state";

const Conversation: React.FC = () => {
  const [{ chatMessages }] = useChat();
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages])

  return (
    <div className="conversation-box overflow-y-auto bg-messages text-slate-900">
      <div className="py-2 px-3 overflow-y-auto" ref={chatRef}>
        {chatMessages.map((message, index) => {
          const isGptMsg = message.author === 'GPT';

          return (
            <div className={`flex mb-2 ${!isGptMsg && 'justify-end'}`} key={`chat-${index}`}>
              <div className={`rounded py-2 px-3 ${isGptMsg ? 'bg-incoming-msg' : 'bg-outgoing-msg'}`}>
                {isGptMsg && <p className="text-sm text-gpt-msg">
                  {message.author}
                </p>}
                <span className="text-sm mt-1 text-primary-msg whitespace-normal" dangerouslySetInnerHTML={{
                  __html: marked.parse(message.text.trim())
                }}></span>
                <p className="text-right text-xs text-meta-msg mt-1">
                  {moment(message.timestamp).fromNow()}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Conversation;
