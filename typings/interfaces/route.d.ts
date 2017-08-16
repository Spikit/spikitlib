/// <reference types="express" />
import { Response, NextFunction } from 'express';
import { View } from '../core';
import { SpikitRequest } from '.';
export interface RouteGroupOptions {
    middleware?: ((req: SpikitRequest, res: Response, next: NextFunction) => void)[];
    namespace?: string;
    prefix?: string;
}
export interface RouteController {
    (req: SpikitRequest): Response | View | void;
}
