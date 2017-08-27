/// <reference types="mongoose" />
import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
export declare abstract class Model {
    protected indexes: any;
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
    protected static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema;
}
