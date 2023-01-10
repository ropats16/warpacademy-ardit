// src/contracts/actions/write/postMessage.ts

import { ArditAction, ArditState, ContractResult } from "../../types/types";

declare const ContractError;

// takes in the current state and action inputs
// passed in through handler function based off SmartWeave standard
// returns result of type Contract Result
export const postMessage = async (
  state: ArditState,
  { caller, input: { content } }: ArditAction
): Promise<ContractResult> => {
  const messages = state.messages;
  if (!content) {
    // throws an error if no content input is provided
    throw new ContractError(`Creator must provide a message content.`);
  }

  // id increments with length of messages array
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