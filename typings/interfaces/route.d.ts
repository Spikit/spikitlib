/// <reference types="express" />
import { Response as ExpressResponse, NextFunction } from 'express';
import { Response, View } from '../core/responses';
import { SpikitRequest } from '.';
export interface RouteGroupOptions {
    middleware?: ((req: SpikitRequest, res: ExpressResponse, next: NextFunction) => void)[];
    namespace?: string;
    prefix?: string;
}
export interface RouteController {
    (req: SpikitRequest): Response | View | void;
}
