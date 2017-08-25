/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
import { Middleware } from './Middleware';
export declare class Ajax extends Middleware {
    handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
