/// <reference types="mongoose" />
import { Schema } from 'mongoose';
export interface Model {
    indexes: any;
}
export declare abstract class Model {
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
}
