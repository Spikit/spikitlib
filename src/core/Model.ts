import { Schema, Model as MongooseModel, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'
import { App } from './App'
import { AppMongoConnection } from '../interfaces'

declare type ObjectId = mongoose.Types.ObjectId

export abstract class Model<T extends Document> {

  private static _model: any

  protected indexes: any
  protected abstract collection: string
  protected abstract name: string
  protected abstract schema: Schema

  public static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema {
    return new Schema(definition, options)
  }

  protected get model(): MongooseModel<T> {
    this.makeModel()
    return <MongooseModel<T>>Model._model
  }

  private makeModel() {
    if (!Model._model) {
      Model._model = model<T>(this.name, this.schema, this.collection)
    }
  }


  protected findOne(conditions: object): Promise<T | null> {
    return new Promise<T | null>(async resolve => {
      this.model.findOne(conditions, (err, obj) => {
        if (err) {
          console.error(new Error().stack)
        }
        resolve(obj)
      })
    })
  }

  protected find(conditions: object): Promise<T[] | null> {
    return new Promise<T[] | null>(async resolve => {
      this.model.find(conditions, (err, obj) => {
        if (err) {
          console.error(new Error().stack)
        }
        resolve(obj)
      })
    })
  }

  protected findById(id: string | number | Object): Promise<T | null> {
    return new Promise<T | null>(async resolve => {
      this.model.findById(id, (err, obj) => {
        if (err) {
          console.error(new Error().stack)
        }
        resolve(obj)
      })
    })
  }
}