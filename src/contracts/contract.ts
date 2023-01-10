// src/contracts/contract.ts

import { readMessage } from "./actions/read/readMessage";
import { postMessage } from "./actions/write/postMessage";
import { downvoteMessage, upvoteMessage } from "./actions/write/voting";
import { ArditAction, ArditState, ContractResult } from "./types/types";

declare const ContractError;

export async function handle(
  state: ArditState,
  action: ArditAction
): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'postMessage':
      return await postMessage(state, action);
    case 'upvoteMessage':
      return await upvoteMessage(state, action);
    case 'downvoteMessage':
      return await downvoteMessage(state, action);
    case 'readMessage':
      return await readMessage(state, action);
    default:
      throw new ContractError(
        `No function supplied or function not recognised: "${input.function}"`
      );
  }
}