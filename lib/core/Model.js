"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Model {
    static createSchema(definition) {
        return new mongoose_1.Schema(definition);
    }
}
exports.Model = Model;
