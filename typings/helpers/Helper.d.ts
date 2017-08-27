import { SpikitRequest } from '../interfaces/request';
export interface Helper {
    init(req: SpikitRequest): void;
}
export declare abstract class Helper {
    abstract name: string;
    abstract help(...args: any[]): any;
}
