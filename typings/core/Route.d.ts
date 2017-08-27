/// <reference types="express" />
import { Router, RequestHandler, Response as ExpressResponse, NextFunction } from 'express';
import { SpikitRequest, RouteGroupOptions, RouteController } from '../interfaces';
export declare abstract class Route {
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
    protected static _router: SpikitRouter | null;
    static readonly router: SpikitRouter | null;
    static group(options: RouteGroupOptions, callback: (route: RouteGroup) => void): typeof Route;
    static get(routePath: string, controller: RouteController | string): SpikitRouter;
    static post(routePath: string, controller: RouteController | string): SpikitRouter;
    static put(routePath: string, controller: RouteController | string): SpikitRouter;
    static delete(routePath: string, controller: RouteController | string): SpikitRouter;
    static patch(routePath: string, controller: RouteController | string): SpikitRouter;
    static all(routePath: string, controller: RouteController | string): SpikitRouter;
    static applyRoute(): void;
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
    name(name: string): this;
    get(controller: RequestHandler): this;
    post(controller: RequestHandler): this;
    put(controller: RequestHandler): this;
    delete(controller: RequestHandler): this;
    patch(controller: RequestHandler): this;
    all(controller: RequestHandler): this;
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
