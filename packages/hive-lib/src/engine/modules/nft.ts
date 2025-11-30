// Placeholder type for missing dependency
interface ClientFetch {
  call<T = any>(endpoint: string, request: any): Promise<T>;
}
import { HiveEngineContract } from './base.js';
import { HiveEngineNftTableName } from '../types';

export class HiveEngineNftContractsApi extends HiveEngineContract<HiveEngineNftTableName> {
    constructor(fetch: ClientFetch) {
        super(fetch, 'nft');
    }

    public getParams(): Promise<any> {
        return this.findOne('params', {});
    }
}
