"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class Translation {
    constructor(locale) {
        this.locale = 'en';
        this.locale = locale;
    }
    get(key, fallback = '') {
        let parts = key.split('.');
        let transKey = parts.pop();
        let file = require(path.join(process.cwd(), 'resources/lang', this.locale, parts.join('/')) + '.json');
        console.log(file[transKey]);
    }
}
exports.Translation = Translation;
