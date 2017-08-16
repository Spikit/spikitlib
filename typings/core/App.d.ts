/// <reference types="express" />
import { Express, RequestHandler } from 'express';
export interface AppServerOptions {
    port: number;
}
export interface AppViewOptions {
    engine: string;
    paths: string[];
    basedir: string;
}
export interface AppOptions {
    view: AppViewOptions;
    server: AppServerOptions;
    static: string[];
    sass: any;
}
export declare class App {
    private static _express;
    private static _server;
    static host: string;
    static readonly express: Express;
    static init(options: AppOptions): void;
    static set(setting: string, value: any): void;
    static use(...handlers: RequestHandler[]): void;
    static start(): void;
}
