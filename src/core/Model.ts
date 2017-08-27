import { Schema, Model as MongooseModel, Document, model } from 'mongoose'
import * as mongoose from 'mongoose'
import { App } from './App'
import { AppMongoConnection } from '../interfaces'
import { MongoError } from 'mongodb'

declare type ObjectId = mongoose.Types.ObjectId

export abstract class Model<T extends Document> {

  private _connection: AppMongoConnection
  private _mongoConnected: boolean = false

  protected indexes: any
  protected abstract collection: string
  protected abstract name: string
  protected abstract schema: Schema

  public static createSchema(definition: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions): Schema {
    return new Schema(definition, options)
  }

  private _model: MongooseModel<T>

  protected async model(): Promise<MongooseModel<T>> {
    if (!this._model) {
      await this.makeModel()
    }
    return this._model
  }

  public constructor(connectionName?: string) {
    for (let conn of App.options.mongo.connections) {
      if ((connectionName && conn.name == connectionName) || (!connectionName && conn.isDefault)) {
        this._connection = conn
        break
      }
    }
  }

  private async makeModel() {
    if (!this._mongoConnected) {
      try {
        await this.connect()
      } catch (e) {
        throw e
      }
    }
    this._model = model<T>(this.name, this.schema, this.collection)
  }

  private connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let mongoose = require('mongoose')
      mongoose.Promise = global.Promise
      if (this._connection) {
        let connectionString = `mongodb://${this._connection.host}:${this._connection.port}/${this._connection.collection}`
        mongoose.connect(connectionString, (err: MongoError) => {
          if (err) {
            console.log(new Error().stack)
            this._mongoConnected = false
            reject(err)
          } else {
            console.log(`Connected to the database: ${connectionString}`)
            this._mongoConnected = true
            resolve(true)
          }
        })
      }
    })
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