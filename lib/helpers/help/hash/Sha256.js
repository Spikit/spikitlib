"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptojs = require("crypto-js");
const Helper_1 = require("../../Helper");
class Sha1 extends Helper_1.Helper {
    constructor() {
        super(...arguments);
        this.name = 'sha256';
    }
    help(str) {
        return cryptojs.SHA256(str).toString();
    }
}
exports.default = Sha1;
