/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
export declare abstract class Middleware {
    abstract handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
