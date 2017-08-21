/// <reference types="express" />
import { Router, RequestHandler, Response as ExpressResponse, NextFunction } from 'express';
import { SpikitRequest, RouteGroupOptions, RouteController } from '../interfaces';
export declare class Route {
    protected static _routeNames: {
        name: string;
        route: string;
    }[];
    static readonly routeNames: {
        name: string;
        route: string;
    }[];
    protected static currentGroup: RouteGroup | null;
    protected static currentMiddleware: ((req: SpikitRequest, res: ExpressResponse, next: NextFunction) => void)[];
    protected static currentPrefix: string;
    protected static lastRoute: string;
    static group(options: RouteGroupOptions, callback: (route: RouteGroup) => void): typeof Route;
    static get(routePath: string, controller: RouteController | string): SpikitRouter;
    static post(routePath: string, controller: RouteController | string): typeof Route;
    static put(routePath: string, controller: RouteController | string): typeof Route;
    static delete(routePath: string, controller: RouteController | string): typeof Route;
    static patch(routePath: string, controller: RouteController | string): typeof Route;
    static all(routePath: string, controller: RouteController | string): typeof Route;
    static routeName(name: string): typeof Route;
    private static _runController(req, res, controller);
    private static _runRoute(controller, req, res);
    private static _getPath(routePath);
    private static _getController(controller);
    private static _getControllerFromString(string);
}
export declare class SpikitRouter {
    private _path;
    private _router;
    private _controllers;
    private _middleware;
    constructor(path: string);
    apply(): Router;
    middleware(...routeMiddleware: string[]): this;
    private applyMiddleware();
    get(controller: RequestHandler): this;
}
export declare class RouteGroup extends Route {
    options: RouteGroupOptions;
    get(routePath: string, controller: RouteController | string): SpikitRouter;
    post(routePath: string, controller: RouteController | string): typeof Route;
    put(routePath: string, controller: RouteController | string): typeof Route;
    delete(routePath: string, controller: RouteController | string): typeof Route;
    patch(routePath: string, controller: RouteController | string): typeof Route;
    all(routePath: string, controller: RouteController | string): typeof Route;
    group(options: RouteGroupOptions, callback: (route: RouteGroup) => void): typeof Route;
}
