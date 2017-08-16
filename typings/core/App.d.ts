/// <reference types="express" />
import { Express, RequestHandler } from 'express';
export interface AppMainOptions {
    locale: string;
    locales: {}[];
    static: string[];
}
export interface AppServerOptions {
    port: number;
}
export interface AppViewOptions {
    engine: string;
    paths: string[];
    basedir: string;
}
export interface SpikitRequestHandler {
    handle: RequestHandler;
}
export interface AppKernel {
    middleware: SpikitRequestHandler[];
    middlewareGroups: any[];
}
export interface AppOptions {
    app: AppMainOptions;
    view: AppViewOptions;
    server: AppServerOptions;
    static: string[];
    sass: any;
    kernel: AppKernel;
}
export declare class App {
    private static _express;
    private static _server;
    private static _options;
    static host: string;
    static readonly express: Express;
    static readonly options: AppOptions;
    static init(options: AppOptions): void;
    static set(setting: string, value: any): void;
    static use(...handlers: RequestHandler[]): void;
    static start(): void;
}
