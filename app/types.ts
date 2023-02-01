export type ChatMessage = {
  text: string;
  author?: Users,
  timestamp?: moment.Moment;
  isError: boolean;
};

export enum ActionTypes {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_CHAT_MESSAGE = 'SET_CHAT_MESSAGE',
  SET_PROMPT = 'SET_PROMPT'
}

export enum Users {
  USERNAME = 'Me',
  GPT_NAME = 'GPT'
}

export type Action = {
  type: ActionTypes;
  prompt?: string;
  error?: string;
  chatMessage?: ChatMessage;
  chatMessages?: ChatMessage[]
};

export type AppState = {
  isLoading: boolean;
  error: string;
  chatMessages: ChatMessage[]
}