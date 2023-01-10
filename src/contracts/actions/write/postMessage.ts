// src/contracts/actions/write/postMessage.ts

import { ArditAction, ArditState, ContractResult } from "../../types/types";

declare const ContractError;

// takes in the previous state and action inputs
export const postMessage = async (
  state: ArditState,
  { caller, input: { content } }: ArditAction
): Promise<ContractResult> => {
  const messages = state.messages;
  if (!content) {
    throw new ContractError(`Creator must provide a message content.`);
  }

  const id = messages.length == 0 ? 1 : messages.length + 1;

  state.messages.push({
    id,
    creator: caller,
    content,
    votes: {
      addresses: [],
      status: 0,
    },
  });

  return { state };
};