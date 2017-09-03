import { Helper } from '../Helper';
import { SpikitRequest } from '../../interfaces';
export default class Route extends Helper {
    name: string;
    currentRoute: string;
    req: SpikitRequest;
    init(req: SpikitRequest): void;
    help(name: string, ...args: any[]): string;
    private replaceRouteParams(route, args);
}
