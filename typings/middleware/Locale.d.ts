/// <reference types="express" />
import { Request, Response, NextFunction } from 'express';
export interface SpikitRequest extends Request {
    locale: string;
}
export declare class Locale {
    static handle(req: SpikitRequest, res: Response, next: NextFunction): void;
}
