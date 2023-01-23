'use client';

import moment from "moment";
import Image from "next/image";
import { useReducer } from "react";

type ChatMessage = {
  text: string;
  author?: 'GPT' | 'me',
  timestamp?: moment.Moment;
};

type Action = {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'ADD_MESSAGE' | 'SET_PROMPT'
  payload?: string | ChatMessage;
};

type State = {
  prompt: string;
  isLoading: boolean;
  error: string;
  chatMessages: ChatMessage[]
}

const dataFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: String(action.payload)
      };
    case 'ADD_MESSAGE':
      const newMessage: ChatMessage = {
        text: String(action?.payload?.text),
        author: action?.payload?.author || 'GPT',
        timestamp: moment()
      };
      return {
        ...state,
        chatMessages: [...state.chatMessages, newMessage]
      };
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: String(action.payload)
      };
    default:
      throw new Error();
  }
};

export default function Page() {
  const [{
    isLoading,
    prompt,
    chatMessages
  }, dispatch] = useReducer(dataFetchReducer, {
    prompt: '',
    isLoading: false,
    error: '',
    chatMessages: []
  });

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PROMPT', payload: event.target.value });
  };
  const handleSendMessage = async () => {
    dispatch({ type: 'FETCH_INIT' });
    dispatch({ type: 'SET_PROMPT', payload: '' });
    dispatch({ type: 'ADD_MESSAGE', payload: { text: prompt, author: 'me' } });
    try {
      const response = await fetch('/api/promptCompletion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: prompt }) })
      const data = await response.json();
      dispatch({ type: 'ADD_MESSAGE', payload: { text: String(data.gptMessage) } });
      dispatch({ type: 'FETCH_SUCCESS', payload: data.gptMessage });

    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
      {/* <!-- Header --> */}
      <div className="py-2 px-3 bg-panel text-slate-200 flex flex-row justify-between items-center drop-shadow">
        <div className="flex items-center">
          <div>
            <Image className="w-10 h-10 rounded-full" width={50} height={50} src="https://thispersondoesnotexist.com/image" alt="" />
          </div>
          <div className="ml-4">
            <p className="text-grey-darkest">
              Chat GPT
            </p>
            {/* <p className="text-grey-darker text-xs mt-1">
              lorem ipsum
            </p> */}
          </div>
        </div>
      </div>

      {/* <!-- Messages --> */}
      <div className="flex-1 overflow-auto bg-messages text-slate-900	">
        <div className="py-2 px-3">

          <div className="flex justify-center mb-2 select-none">
            <div className="rounded py-2 px-4 bg-system-msg text-placeholder">
              <p className="text-sm uppercase">
                {moment().format('MMMM D, YYYY')}
              </p>
            </div>
          </div>

          {chatMessages.map((message, index) => {
            const isGptMsg = message.author === 'GPT';
            return (
              <div className={`flex mb-2 ${!isGptMsg && 'justify-end'}`} key={index}>
                <div className={`rounded py-2 px-3 ${isGptMsg ? 'bg-incoming-msg' : 'bg-outgoing-msg'}`}>
                  {isGptMsg && <p className="text-sm text-gpt-msg">
                    {message.author}
                  </p>}
                  <p className="text-sm mt-1 text-primary-msg">
                    {message.text}
                  </p>
                  <p className="text-right text-xs text-meta-msg mt-1">
                    {message.timestamp?.fromNow()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* <!-- Input --> */}
      <form className="bg-panel text-placeholder px-4 py-4 flex items-center">
        <div className="flex-1 mx-4">
          <input className="w-full border-input rounded px-2 py-2 text-slate-200 bg-input placeholder:text-placeholder" type="text" placeholder="Type a message" value={prompt} onChange={handlePromptChange} disabled={isLoading} />
        </div>
        <div>
          <button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ?
              <Image src='/images/arrow-path.svg' height={30} width={30} alt="" />

              :
              <Image src='/images/paper-airplane.svg' height={30} width={30} color='text-slate-200' alt="" />
            }
          </button>
        </div>
      </form>
    </div>
  )
}
