"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
class View {
    constructor(path, data) {
        this._path = '';
        this._data = {};
        this._response = Response_1.response();
        this._path = path.replace(/\./g, '/');
        this._data = data || {};
    }
    get path() { return this._path; }
    get data() { return this._data; }
    get response() { return this._response; }
}
exports.View = View;
exports.view = function (path, data) {
    return new View(path, data);
};
