// src/contracts/types/types.ts

// interface of contract state is an array of messages of type Message
export interface ArditState {
  messages: Message[];
}

interface Message {
  id: number;
  creator: string;
  content: string;
  votes: {
    addresses: string[];
    status: number;
  };
}

//information about action called on the contract
export interface ArditAction {
  input: ArditInput;
  caller: string;
}

// id is the message id and content is message content
export interface ArditInput {
  function: ArditFunction;
  id: number;
  content: string;
}

// type of function (action) called
export type ArditFunction =
  | 'postMessage'
  | 'upvoteMessage'
  | 'downvoteMessage'
  | 'readMessage';

// returns message query
export type ArditResult = Message;

// returns either updated state or requested message
export type ContractResult = { state: ArditState } | { result: ArditResult };