import { Response, View } from '../core/responses';
import { SpikitRequest } from '.';
export interface RouteGroupOptions {
    middleware?: string[];
    namespace?: string;
    prefix?: string;
}
export interface RouteController {
    (req: SpikitRequest): Response | View | void;
}
