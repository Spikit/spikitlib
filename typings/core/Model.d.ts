/// <reference types="mongoose" />
import { Schema, Model as MongooseModel, Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare abstract class Model<T extends Document> {
    protected indexes: any;
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
    static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema;
    private _model;
    model(): MongooseModel<T>;
    constructor();
    private makeModel();
}
