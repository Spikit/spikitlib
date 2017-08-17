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
        let file = require(path.join(global.projectRoot, 'resources/lang', this.locale, parts.join('/')) + '.json');
        if (file && transKey) {
            return file[transKey] || fallback;
        }
        return fallback;
    }
}
exports.Translation = Translation;
