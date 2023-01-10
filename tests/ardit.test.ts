// tests/ardit.test.ts
import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { ArditState } from '../src/contracts/types/types';
import fs from 'fs';
import path from 'path';

jest.setTimeout(30000);

describe('Testing the Atomic NFT Token', () => {
  let ownerWallet: JWKInterface;
  let owner: string;

  let user2Wallet: JWKInterface;
  let user2: string;

  let user3Wallet: JWKInterface;
  let user3: string;

  let initialState: ArditState;

  let arlocal: ArLocal;
  let warp: Warp;
  let ardit: Contract<ArditState>;

  let contractSrc: string;
  let contractId: string;
});