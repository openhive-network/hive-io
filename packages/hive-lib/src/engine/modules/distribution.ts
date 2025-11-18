// TODO
// Placeholder type for missing dependency
interface ClientFetch {
  call<T = any>(endpoint: string, request: any): Promise<T>;
}
import { HiveEngineContract } from './base.js';
import { HiveEngineDistributionTableName } from '../types';

export class HiveEngineDistributionContractsApi extends HiveEngineContract<HiveEngineDistributionTableName> {
    constructor(fetch: ClientFetch) {
        super(fetch, 'distribution');
    }

    public getParams(): Promise<any> {
        return this.findOne('params', {});
    }
}
