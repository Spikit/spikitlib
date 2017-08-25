/// <reference types="express" />
import { Request } from 'express';
export interface SpikitRequest extends Request {
    locale: string;
}
