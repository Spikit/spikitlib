/// <reference types="express" />
import { Middleware } from '../Middleware';
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../../interfaces';
export declare class Input extends Middleware {
    handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
