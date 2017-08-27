import { Helper } from '../Helper';
import { SpikitRequest } from '../../interfaces';
export default class Url extends Helper {
    name: string;
    currentRoute: string;
    init(req: SpikitRequest): void;
    help(urlPath: string): string;
}
