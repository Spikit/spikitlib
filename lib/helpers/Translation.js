"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class Translation {
    static get(key, fallback = '') {
        let parts = key.split('.');
        let transKey = parts.pop();
        let file = require(path.join(process.cwd(), 'resources/lang', parts.join('/'), '.json'));
        console.log(file);
    }
}
exports.Translation = Translation;
