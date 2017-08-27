"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const App_1 = require("./App");
class Model {
    constructor(connectionName) {
        this._mongoConnected = false;
        for (let conn of App_1.App.options.mongo.connections) {
            if ((connectionName && conn.name == connectionName) || (!connectionName && conn.isDefault)) {
                this._connection = conn;
                break;
            }
        }
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
    makeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._mongoConnected) {
                try {
                    yield this.connect();
                }
                catch (e) {
                    throw e;
                }
            }
            this._model = mongoose_1.model(this.name, this.schema, this.collection);
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            let mongoose = require('mongoose');
            mongoose.Promise = global.Promise;
            if (this._connection) {
                let connectionString = `mongodb://${this._connection.host}:${this._connection.port}/${this._connection.collection}`;
                mongoose.connect(connectionString, (err) => {
                    if (err) {
                        console.log(new Error().stack);
                        this._mongoConnected = false;
                        reject(err);
                    }
                    else {
                        console.log(`Connected to the database: ${connectionString}`);
                        this._mongoConnected = true;
                        resolve(true);
                    }
                });
            }
        });
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
