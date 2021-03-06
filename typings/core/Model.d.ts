/// <reference types="mongoose" />
import { Schema, Model as MongooseModel, Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare abstract class Model<T extends Document> {
    private static _model;
    protected indexes: any;
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
    static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema;
    protected readonly model: MongooseModel<T>;
    private makeModel();
    protected findOne(conditions: object): Promise<T | null>;
    protected find(conditions: object): Promise<T[] | null>;
    protected findById(id: string | number | Object): Promise<T | null>;
}
