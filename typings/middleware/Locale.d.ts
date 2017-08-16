/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { SpikitRequest } from '../interfaces';
export declare class Locale {
    static handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
