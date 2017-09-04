import { SpikitRouter } from './Router';
import { RouteGroupOptions, RouteController } from '../../interfaces';
export declare abstract class Route {
    protected static _routeNames: {
        name: string;
        route: string;
    }[];
    static readonly routeNames: {
        name: string;
        route: string;
    }[];
    protected static _currentGroup: RouteGroup | null;
    protected static _currentMiddleware: string[];
    protected static _currentPrefix: string;
    protected static _lastRoute: string;
    protected static _router: SpikitRouter | null;
    static readonly router: SpikitRouter | null;
    static readonly currentMiddleware: string[];
    static group(options: RouteGroupOptions, callback: (route: RouteGroup) => void): typeof Route;
    static get(routePath: string, controller: RouteController | string): SpikitRouter;
    static post(routePath: string, controller: RouteController | string): SpikitRouter;
    static put(routePath: string, controller: RouteController | string): SpikitRouter;
    static delete(routePath: string, controller: RouteController | string): SpikitRouter;
    static patch(routePath: string, controller: RouteController | string): SpikitRouter;
    static all(routePath: string, controller: RouteController | string): SpikitRouter;
    static applyCurrentRoute(): void;
    private static _runController(req, res, controller);
    private static _runRoute(controller, req, res);
    private static _getPath(routePath);
    private static _getController(controller);
    private static _getControllerFromString(string);
}
export declare class RouteGroup extends Route {
    options: RouteGroupOptions;
    get(routePath: string, controller: RouteController | string): SpikitRouter;
    post(routePath: string, controller: RouteController | string): SpikitRouter;
    put(routePath: string, controller: RouteController | string): SpikitRouter;
    delete(routePath: string, controller: RouteController | string): SpikitRouter;
    patch(routePath: string, controller: RouteController | string): SpikitRouter;
    all(routePath: string, controller: RouteController | string): SpikitRouter;
    group(options: RouteGroupOptions, callback: (route: RouteGroup) => void): typeof Route;
}
