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

  beforeAll(async () => {
    arlocal = new ArLocal(1820, false);
    await arlocal.start();

    LoggerFactory.INST.logLevel('error');
    //LoggerFactory.INST.logLevel('debug', 'WasmContractHandlerApi');

    warp = WarpFactory.forLocal(1820);

    ({ jwk: ownerWallet, address: owner } = await warp.generateWallet());

    ({ jwk: user2Wallet, address: user2 } = await warp.generateWallet());

    ({ jwk: user3Wallet, address: user3 } = await warp.generateWallet());

    initialState = {
      messages: [],
    };

    contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');

    ({ contractTxId: contractId } = await warp.createContract.deploy({
      wallet: ownerWallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    }));
    console.log('Deployed contract: ', contractId);
    ardit = warp.contract<ArditState>(contractId).connect(ownerWallet);
  });
});