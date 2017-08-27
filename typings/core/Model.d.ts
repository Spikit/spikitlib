/// <reference types="mongoose" />
import { Schema, Model as MongooseModel, Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare abstract class Model<T extends Document> {
    private _model;
    private _connectionName?;
    protected indexes: any;
    protected abstract collection: string;
    protected abstract name: string;
    protected abstract schema: Schema;
    static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema;
    protected model(): Promise<MongooseModel<T>>;
    private makeModel();
    private static connect(connectionName?);
    protected findOne(conditions: object): Promise<T | null>;
}
