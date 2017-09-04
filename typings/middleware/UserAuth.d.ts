/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
import { Middleware } from './Middleware';
export declare class UserAuth extends Middleware {
    loginRedirectSuccess: string;
    loginRedirectFail: string;
    logoutRedirect: string;
    handle(req: SpikitRequest, res: Response, next: NextFunction): void;
    private _login(req, res);
    private _logout(req, res, next);
}
