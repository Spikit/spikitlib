import { Schema, Model as MongooseModel, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'

declare type ObjectId = mongoose.Types.ObjectId

export abstract class Model<T extends Document> {

  protected indexes: any
  protected abstract collection: string
  protected abstract name: string
  protected abstract schema: Schema

  protected static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema {
    return new Schema(definition, options)
  }

  private _model: MongooseModel<T>

  public model(): MongooseModel<T> {
    if (!this._model) {
      this.makeModel()
    }
    return this._model
  }

  public constructor() {
    this.makeModel()
  }

  private makeModel() {
    this._model = model<T>(this.name, this.schema, this.collection)
  }

}