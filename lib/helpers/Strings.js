"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Strings {
    static slug(str) {
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
exports.Strings = Strings;
