"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
class Download extends Response_1.Response {
    constructor(filename, downloadPath) {
        super();
        this._downloadPath = '';
        this._filename = '';
        this._downloadPath = downloadPath;
    }
    get downloadPath() {
        return this._downloadPath;
    }
    get filename() {
        return this._filename;
    }
}
exports.Download = Download;
exports.download = function (filename, downloadPath) {
    return new Download(filename, downloadPath);
};
