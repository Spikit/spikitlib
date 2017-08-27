/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
import { Middleware } from './Middleware';
export declare class Typescript extends Middleware {
    handle(req: SpikitRequest, res: Response, next: NextFunction): void;
    private _compileTypeScript(root);
    private _getDirMtime(path);
    private _getTscPath();
}
