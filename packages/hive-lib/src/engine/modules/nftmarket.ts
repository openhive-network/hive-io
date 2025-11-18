// Placeholder type for missing dependency
interface ClientFetch {
  call<T = any>(endpoint: string, request: any): Promise<T>;
}
import { HiveEngineContract } from './base.js';
import { HiveEngineNftMarketTableName } from '../types';

export class HiveEngineNftMarketContractsApi extends HiveEngineContract<HiveEngineNftMarketTableName> {
    constructor(fetch: ClientFetch) {
        super(fetch, 'nftmarket');
    }

    public getParams(): Promise<any> {
        return this.findOne('params', {});
    }
}
