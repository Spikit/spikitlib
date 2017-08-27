"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const App_1 = require("./App");
class Model {
    constructor(connectionName) {
        for (let conn of App_1.App.options.mongo.connections) {
            if ((connectionName && conn.name == connectionName) || (!connectionName && conn.default)) {
                this._connection = conn;
                break;
            }
        }
        this.connect();
        this.makeModel();
    }
    static createSchema(definition, options) {
        return new mongoose_1.Schema(definition, options);
    }
    get model() {
        if (!this._model) {
            this.makeModel();
        }
        return this._model;
    }
    connect() {
        let mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        if (this._connection) {
            let connectionString = `mongodb://${this._connection.host}:${this._connection.port}/${this._connection.collection}`;
            mongoose.connect(connectionString, (err) => {
                if (err)
                    console.log(new Error().stack);
                else
                    console.log(`Connected to the database: ${connectionString}`);
            });
        }
    }
    makeModel() {
        this._model = mongoose_1.model(this.name, this.schema, this.collection);
    }
    findOne(conditions) {
        return new Promise(resolve => {
            this.model.findOne(conditions, (err, obj) => {
                if (err) {
                    return resolve(null);
                }
                resolve(obj);
            });
        });
    }
}
exports.Model = Model;
