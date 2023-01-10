// src/contracts/actions/read/readMessage.ts

import { ArditAction, ArditState, ContractResult } from "../../types/types";

declare const ContractError;

// takes in the current state and action inputs
// passed in through handler function based off SmartWeave standard
// returns result of type Contract Result
export const readMessage = async (
  state: ArditState,
  { input: { id } }: ArditAction
): Promise<ContractResult> => {
  const message = state.messages.find((m) => m.id == id);

  if (!message) {
    throw new ContractError(`Message with id: ${id} does not exist`);
  }

  return { result: message };
};