/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
export declare class Ajax {
    static handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
