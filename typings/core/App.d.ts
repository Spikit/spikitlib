/// <reference types="express" />
import { Express, RequestHandler } from 'express';
import { AppOptions, AppKernel } from '../interfaces';
export declare class App {
    private static _express;
    private static _server;
    private static _options;
    static host: string;
    private static _appRoot;
    private static _projectRoot;
    static readonly express: Express;
    static readonly options: AppOptions;
    static readonly appRoot: string;
    static readonly projectRoot: string;
    static readonly kernel: AppKernel;
    static run(projectRoot: string, appRoot: string): void;
    static init(options: AppOptions): void;
    static set(setting: string, value: any): void;
    static use(...handlers: RequestHandler[]): void;
    static start(): void;
}
