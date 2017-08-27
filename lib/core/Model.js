"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Model {
    constructor() {
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
        this._model = mongoose_1.model(this.name, this.schema, this.collection);
    }
}
exports.Model = Model;
