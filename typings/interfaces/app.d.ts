/// <reference types="express" />
import { RequestHandler } from 'express';
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
