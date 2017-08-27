/// <reference types="mongoose" />
import { Schema, Model as MongooseModel, Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare abstract class Model<T extends Document> {
    protected readonly indexes: any;
    protected readonly abstract collection: string;
    protected readonly abstract name: string;
    protected readonly abstract schema: Schema;
    static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema;
    private _model;
    protected readonly model: MongooseModel<T>;
    constructor();
    private makeModel();
}
