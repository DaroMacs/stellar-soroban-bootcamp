/* eslint-disable */
// @ts-ignore
import {
  Asset,
  BASE_FEE,
  Claimant,
  contract,
  Horizon,
  Keypair,
  Operation,
  rpc,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import {
  CONTRACT_ADDRESS,
  HORIZON_NETWORK_PASSPHRASE,
  HORIZON_URL,
  SOROBAN_RPC_URL,
  STELLAR_FRIENDBOT_URL,
  STELLAR_NETWORK,
} from "../utils/constants";
import { IKeypair } from "../interfaces/keypair";
import { IAccountBalanceResponse } from "../interfaces/balance";
import { AccountBalance } from "../interfaces/account";

export class StellarService {
  private network: string;
  private horizonUrl: string;
  private server: Horizon.Server;
  private rpcServer: rpc.Server;
  private friendBotUrl: string;
  private networkPassphrase: string;
  private contractAddress: string;
  private rpcUrl: string;

  constructor() {
    this.network = STELLAR_NETWORK as string;
    this.horizonUrl = HORIZON_URL as string;
    this.rpcUrl = SOROBAN_RPC_URL as string;
    this.friendBotUrl = STELLAR_FRIENDBOT_URL as string;
    this.networkPassphrase = HORIZON_NETWORK_PASSPHRASE as string;
    this.contractAddress = CONTRACT_ADDRESS as string;

    this.server = new Horizon.Server(this.horizonUrl, {
      allowHttp: true,
    });
    this.rpcServer = new rpc.Server(this.rpcUrl, {
      allowHttp: true,
    });
  }

  async buildClient<T = unknown>(publicKey: string): Promise<T> {
    const client = await contract.Client.from({
      contractId: this.contractAddress,
      rpcUrl: this.rpcUrl,
      networkPassphrase: this.networkPassphrase,
      publicKey,
    });

    return client as T;
  }

  async submitTransaction(xdr: string): Promise<string | undefined> {
    try {
      const transaction = TransactionBuilder.fromXDR(
        xdr,
        this.networkPassphrase,
      );
      const result = await this.server.submitTransaction(transaction);

      return result.hash;
    } catch (error) {
      console.error(error);
      if (error.response?.data?.extras?.result_codes) {
        console.error(
          "❌ Error en la transacción:",
          error.response.data.extras.result_codes,
        );
      } else {
        console.error("❌ Error general:", error);
      }
    }
  }

  environment(): { rpc: string; networkPassphrase: string } {
    return {
      rpc: this.rpcUrl,
      networkPassphrase: this.networkPassphrase,
    };
  }

  private async getAccount(address: string): Promise<Horizon.AccountResponse> {
    try {
      return await this.server.loadAccount(address);
    } catch (error) {
      console.error(error);
      throw new Error("Account not found");
    }
  }

  async getAccountBalance(publicKey: string): Promise<AccountBalance[]> {
    const account = await this.getAccount(publicKey);

    return account.balances.map((b) => ({
      assetCode:
        b.asset_type === "native"
          ? "XLM"
          : (b as IAccountBalanceResponse).asset_code,

      amount: b.balance,
    }));
  }

  createAccount(): IKeypair {
    const pair = Keypair.random();
    return {
      publicKey: pair.publicKey(),
      secretKey: pair.secret(),
    };
  }

  async fundAccount(publicKey: string): Promise<boolean> {
    try {
      if (this.network !== "testnet") {
        throw new Error("Friendbot is only available on testnet");
      }

      const response = await fetch(`${this.friendBotUrl}?addr=${publicKey}`);

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error: unknown) {
      throw new Error(
        `Error when funding account with Friendbot: ${error as string}`,
      );
    }
  }

  private async loadAccount(address: string): Promise<Horizon.AccountResponse> {
    try {
      return await this.server.loadAccount(address);
    } catch (error) {
      console.error(error);
      throw new Error("Account not found");
    }
  }

  async payment(
    senderPubKey: string,
    senderSecret: string,
    receiverPubKey: string,
    amount: string,
  ): Promise<Horizon.HorizonApi.SubmitTransactionResponse | undefined> {
    // Allow undefined in return type
    const sourceAccount = await this.loadAccount(senderPubKey);
    const sourceKeypair = Keypair.fromSecret(senderSecret);

    const transaction = new TransactionBuilder(sourceAccount, {
      networkPassphrase: this.networkPassphrase,
      fee: BASE_FEE,
    })
      .addOperation(
        Operation.payment({
          amount,
          asset: Asset.native(),
          destination: receiverPubKey,
        }),
      )
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeypair);

    try {
      const result = await this.server.submitTransaction(transaction);

      return result;
    } catch (error) {
      console.error(error);
      if (error) {
        console.error("❌ Error en la transacción:", error);
      } else {
        console.error("❌ Error general:", error);
      }
    }
  }
}

export const stellarService = new StellarService();
