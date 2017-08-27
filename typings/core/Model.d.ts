/// <reference types="mongoose" />
import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
export interface Model {
    indexes: any;
}
export declare abstract class Model {
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
    protected static createSchema(definition: mongoose.SchemaDefinition): Schema;
}
