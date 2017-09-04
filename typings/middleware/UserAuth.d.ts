/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
import { Middleware } from './Middleware';
export declare class UserAuth extends Middleware {
    loginRedirectSuccess: string;
    loginRedirectFail: string;
    logoutRedirect: string;
    registerRedirectSuccess: string;
    registerRedirectFail: string;
    constructor();
    handle(req: SpikitRequest, res: Response, next: NextFunction): void;
    private _register();
    private _login();
    private _logout();
}
