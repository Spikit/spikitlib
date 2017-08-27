import { Schema, Model as MongooseModel, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'
import { App } from './App'
import { AppMongoConnection } from '../interfaces'

declare type ObjectId = mongoose.Types.ObjectId

export abstract class Model<T extends Document> {

  private _model: MongooseModel<T>

  protected indexes: any
  protected abstract collection: string
  protected abstract name: string
  protected abstract schema: Schema

  public static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema {
    return new Schema(definition, options)
  }

  protected async model(): Promise<MongooseModel<T>> {
    if (!this._model) {
      await this.makeModel()
    }
    return this._model
  }

  private async makeModel() {
    if (!this._model) {
      this._model = model<T>(this.name, this.schema, this.collection)
    }
  }

  protected findOne(conditions: object): Promise<T | null> {
    return new Promise<T | null>(async resolve => {
      (await this.model()).findOne(conditions, (err, obj) => {
        if (err) {
          return resolve(null)
        }
        resolve(obj)
      })
    })
  }
}