import { AppOptions } from './core/App';
import Response from './core/Response';
import View from './core/View';
export { Route as route, RouteGroup } from './core/Route';
export declare const init: (options: AppOptions) => void;
export declare const start: () => void;
export declare const response: (body?: any) => Response;
export declare const view: (path: string, data?: object | undefined) => View;
