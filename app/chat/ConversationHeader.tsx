import React, { useState } from "react";
import Image from "next/image";
import { useChat } from "./state";
import { ActionTypes } from "../types";

export default function ConversationHeader() {
  const [_, dispatch] = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    dispatch({ type: ActionTypes.SET_CHAT_MESSAGE, chatMessages: [] });
    setShowMenu(false);
  };

  return (
    <header className="py-2 px-3 bg-panel text-slate-200 flex flex-row justify-between items-center drop-shadow h-14">
      <div className="flex items-center">
        <Image className="w-10 h-10 rounded-full" width={50} height={50} src="https://thispersondoesnotexist.com/image" alt="" />
        <div className="ml-4">
          <p className="text-grey-darkest">
            Chat GPT
          </p>
          {/* <p className="text-grey-darker text-xs mt-1">
              lorem ipsum
            </p> */}
        </div>
      </div>
      <div className="flex-end relative">
        <button onClick={() => { setShowMenu(!showMenu) }}>
          <Image src='/images/adjustments-horizontal.svg' height={30} width={30} color='text-slate-200' alt="" />
        </button>
        {showMenu &&
          <div className="absolute bg-default p-2 border border-input shadow-md z-10 right-0 w-64">
            <ul className="list-none">
              <li><button onClick={handleClick}>Clear conversation</button></li>
            </ul>
          </div>
        }
      </div>
    </header>
  );
}