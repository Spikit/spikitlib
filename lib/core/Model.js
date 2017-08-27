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
class Model {
    static createSchema(definition, options) {
        return new mongoose_1.Schema(definition, options);
    }
    model() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._model) {
                yield this.makeModel();
            }
            return this._model;
        });
    }
    makeModel() {
        return __awaiter(this, void 0, void 0, function* () {
            this._model = mongoose_1.model(this.name, this.schema, this.collection);
        });
    }
    static connect(connectionName) {
        return new Promise((resolve, reject) => {
        });
    }
    findOne(conditions) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            (yield this.model()).findOne(conditions, (err, obj) => {
                if (err) {
                    return resolve(null);
                }
                resolve(obj);
            });
        }));
    }
}
exports.Model = Model;
