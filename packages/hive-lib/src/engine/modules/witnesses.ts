// Placeholder type for missing dependency
interface ClientFetch {
  call<T = any>(endpoint: string, request: any): Promise<T>;
}
import { HiveEngineContract } from './base.js';
import { HiveEngineWitnessesTableName } from '../types';

export class HiveEngineWitnessesContractsApi extends HiveEngineContract<HiveEngineWitnessesTableName> {
    constructor(fetch: ClientFetch) {
        super(fetch, 'witnesses');
    }
}
