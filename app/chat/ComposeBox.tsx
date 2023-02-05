'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "./state";
import { ActionTypes, ChatMessage, Users } from "../types";

export default function ComposeBox() {
  const [{ isLoading, chatMessages }, dispatch] = useChat();
  const promptRef = useRef<HTMLInputElement>(null);
  const handleError = () => {
    dispatch({ type: ActionTypes.FETCH_ERROR, chatMessage: { text: 'Error in handleSendMessage', isError: true } });
  };

  async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const chatMessage: ChatMessage = {
      text: promptRef.current!.value,
      author: Users.USERNAME,
      isError: false
    };
    const prompt = [...chatMessages, ...[chatMessage]].map(message => `${message.author}: ${message.text}\n`).join(' ');
    promptRef.current!.value = '';
    dispatch({ type: ActionTypes.FETCH_INIT, chatMessage });

    console.log(prompt);


    try {
      const response = await fetch('/api/promptCompletion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
      const data = await response.json();

      if (data.error) {
        return handleError();
      }

      dispatch({ type: ActionTypes.ADD_MESSAGE, chatMessage: { text: String(data.gptMessage.replace('GPT:', '')), isError: false } });
      dispatch({ type: ActionTypes.FETCH_SUCCESS });
      promptRef.current?.focus();
    } catch (error) {
      return handleError();
    }
  };

  useEffect(() => {
    promptRef.current?.focus();
  }, [])

  return (
    <form className="bg-panel text-placeholder h-16 px-1 py-4 flex items-center" onSubmit={handleSendMessage}>
      <div className="flex-1 mx-2">
        <input ref={promptRef} className="w-full border-input rounded px-2 py-2 text-slate-200 bg-input placeholder:text-placeholder" type="text" placeholder="Type a message" name="prompt" />
      </div>
      <div className="flex-initial mx-1">
        <button disabled={isLoading}>
          {isLoading ?
            <Image src='/images/arrow-path.svg' height={30} width={30} alt="" />

            :
            <Image src='/images/paper-airplane.svg' height={30} width={30} color='text-slate-200' alt="" />
          }
        </button>
      </div>
    </form>
  );
}