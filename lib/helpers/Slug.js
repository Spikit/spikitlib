"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
class Slug extends Helper_1.Helper {
    constructor() {
        super(...arguments);
        this.name = 'slug';
    }
    helper(str) {
        return str
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
}
exports.Slug = Slug;
