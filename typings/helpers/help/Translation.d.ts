import { Helper } from '../Helper';
import { SpikitRequest } from '../../interfaces';
export default class Translation extends Helper {
    name: string;
    private locale;
    init(req: SpikitRequest): void;
    help(key: string, fallback?: string): any;
}
