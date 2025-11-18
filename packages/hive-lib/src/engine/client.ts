import { PrivateKey } from '@hiveio/dhive';
import { HiveEngineBlockchainApi, HiveEngineBlockchainOptions } from './modules/blockchain.js';
import {
    HiveEngineDistributionContractsApi,
    HiveEngineMarketContractsApi,
    HiveEngineMarketPoolsContractsApi,
    HiveEngineNftContractsApi,
    HiveEngineNftMarketContractsApi,
    HiveEngineWitnessesContractsApi,
} from './modules/index.js';
import { HiveEngineOperation, HiveEngineOperationJson, HiveEngineTokensTransferOperation } from './types.js';
import { HiveEngineTokensContractsApi } from './modules/tokens.js';

// ClientFetch implementation
class ClientFetch {
  constructor(private nodes: string[]) {}

  async call<T = any>(endpoint: string, request: any): Promise<T> {
    // Wrap request in JSON-RPC 2.0 envelope
    const rpcRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      ...request,
    };

    const response = await fetch(this.nodes[0] + '/' + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rpcRequest),
    });

    const data = await response.json();

    // Return the result field from JSON-RPC response
    return data.result !== undefined ? data.result : data;
  }
}

export interface HiveEngineOptions {
    nodes: string | string[];
    chainId: string;
}

export type HiveEngineParameters = Partial<HiveEngineOptions> & Partial<HiveEngineBlockchainOptions>;

export class HiveEngineClient {
    public static defaultNodes = ['https://api.hive-engine.com/rpc', 'https://herpc.dtools.dev', 'https://enginerpc.com'];
    public static defaultChainId = 'ssc-mainnet-hive';
    // Modules
    public readonly blockchain: HiveEngineBlockchainApi;

    // Contracts
    public readonly distribution: HiveEngineDistributionContractsApi;
    public readonly market: HiveEngineMarketContractsApi;
    public readonly marketpools: HiveEngineMarketPoolsContractsApi;
    public readonly nft: HiveEngineNftContractsApi;
    public readonly nftmarket: HiveEngineNftMarketContractsApi;
    public readonly tokens: HiveEngineTokensContractsApi;
    public readonly witnesses: HiveEngineWitnessesContractsApi;

    private options: HiveEngineOptions;
    private fetch: ClientFetch;

    constructor(parameters: HiveEngineParameters = {}) {
        this.options = {
            nodes: HiveEngineClient.defaultNodes,
            chainId: HiveEngineClient.defaultChainId,
            ...parameters,
        };

        const nodes = Array.isArray(this.options.nodes) ? this.options.nodes : [this.options.nodes];
        this.fetch = new ClientFetch(nodes);

        // Modules
        this.blockchain = new HiveEngineBlockchainApi(this.fetch, parameters);

        // Contracts
        this.distribution = new HiveEngineDistributionContractsApi(this.fetch);
        this.market = new HiveEngineMarketContractsApi(this.fetch);
        this.marketpools = new HiveEngineMarketPoolsContractsApi(this.fetch);
        this.nft = new HiveEngineNftContractsApi(this.fetch);
        this.nftmarket = new HiveEngineNftMarketContractsApi(this.fetch);
        this.tokens = new HiveEngineTokensContractsApi(this.fetch);
        this.witnesses = new HiveEngineWitnessesContractsApi(this.fetch);
    }
}
