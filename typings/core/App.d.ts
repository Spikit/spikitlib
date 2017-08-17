/// <reference types="express" />
import { Express, RequestHandler } from 'express';
import { AppOptions } from '../interfaces';
export declare class App {
    private static _express;
    private static _server;
    private static _options;
    static host: string;
    static readonly express: Express;
    static readonly options: AppOptions;
    static run(): void;
    static init(options: AppOptions): void;
    static set(setting: string, value: any): void;
    static use(...handlers: RequestHandler[]): void;
    static start(): void;
}
