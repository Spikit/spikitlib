"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const core_1 = require("../../core");
const Helper_1 = require("../Helper");
class Translation extends Helper_1.Helper {
    constructor() {
        super(...arguments);
        this.name = 'trans';
        this.locale = 'en';
    }
    init(req) {
        this.locale = req.locale;
    }
    help(key, fallback = '') {
        let parts = key.split('.');
        let transKey = parts.pop();
        try {
            let file = require(path.join(core_1.App.projectRoot, 'resources/lang', this.locale, parts.join('/')) + '.json');
            if (file && transKey) {
                return file[transKey] || fallback;
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
        return fallback;
    }
}
exports.default = Translation;
