"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Helper_1 = require("../../Helper");
class Md5 extends Helper_1.Helper {
    constructor() {
        super(...arguments);
        this.name = 'md5';
    }
    help(str) {
        return crypto_js_1.MD5(str).toString();
    }
}
exports.default = Md5;
