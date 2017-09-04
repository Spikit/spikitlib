/// <reference types="express" />
import { RequestHandler } from 'express';
export declare class SpikitRouter {
    private _path;
    private _router;
    private _controllers;
    private _middleware;
    constructor(path: string, groupMiddleware?: string[]);
    apply(): void;
    private applyMiddleware();
    name(name: string): this;
    middleware(...routeMiddleware: string[]): this;
    get(controller: RequestHandler): this;
    post(controller: RequestHandler): this;
    put(controller: RequestHandler): this;
    delete(controller: RequestHandler): this;
    patch(controller: RequestHandler): this;
    all(controller: RequestHandler): this;
}
