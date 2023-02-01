import moment from "moment";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AppState, Action, ChatMessage, ActionTypes, Users } from "../types";

const defaultState = {
  isLoading: false,
  error: '',
  chatMessages: []
};
const ChatContext = createContext<{ state: AppState, dispatch: React.Dispatch<Action> }>({ state: defaultState, dispatch: () => { } });
const localStorageKey: string = String(process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY);

export const chatReducer = (state: AppState, action: Action): AppState => {
  let chatMessages: ChatMessage[], newMessage: ChatMessage;

  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      newMessage = {
        text: String(action?.chatMessage?.text),
        author: action?.chatMessage?.author || Users.USERNAME,
        timestamp: moment(),
        isError: false
      };
      chatMessages = [...state.chatMessages, newMessage];

      return {
        ...state,
        isLoading: true,
        error: '',
        chatMessages
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: String(action.error)
      };
    case ActionTypes.ADD_MESSAGE:
      newMessage = {
        text: String(action?.chatMessage?.text),
        author: action?.chatMessage?.author || Users.GPT_NAME,
        timestamp: moment(),
        isError: action?.chatMessage?.isError || false
      };
      chatMessages = [...state.chatMessages, newMessage];
      return {
        ...state,
        chatMessages
      };
    case ActionTypes.SET_CHAT_MESSAGE:
      chatMessages = [...action.chatMessages || []];

      return {
        ...state,
        chatMessages
      };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, defaultState);

  useEffect(() => {
    const storedMessages = localStorage.getItem(localStorageKey);
    if (storedMessages) {
      dispatch({ type: ActionTypes.SET_CHAT_MESSAGE, chatMessages: JSON.parse(storedMessages) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state.chatMessages));
  }, [state.chatMessages]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): [AppState, React.Dispatch<Action>] => {
  const { state, dispatch } = useContext(ChatContext);
  return [state, dispatch];
};
