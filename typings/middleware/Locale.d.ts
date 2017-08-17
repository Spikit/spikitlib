/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
import { Middleware } from '.';
export declare class Locale extends Middleware {
    static handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
