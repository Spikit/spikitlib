/// <reference types="express" />
import { Request } from 'express';
export declare class Auth {
    protected authField: string;
    protected authPassField: string;
    protected _request: Request;
    constructor(request: Request);
    check(): any;
}
