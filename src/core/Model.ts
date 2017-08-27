import { Schema, Model as MongooseModel, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'

declare type ObjectId = mongoose.Types.ObjectId

export interface Model {
  indexes: any
}

export abstract class Model {

  protected abstract collection: string
  protected abstract name: string
  protected abstract schema: Schema

}