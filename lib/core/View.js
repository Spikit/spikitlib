"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class View {
    constructor(path, data) {
        this._path = '';
        this._data = {};
        this._path = path.replace(/\./g, '/');
        this._data = data || {};
    }
    get path() { return this._path; }
    get data() { return this._data; }
}
exports.View = View;
exports.view = function (path, data) {
    return new View(path, data);
};
