"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(body) {
        this._headers = {};
        this._body = body;
    }
    get body() { return this._body; }
    get headers() { return this._headers; }
    get statusCode() { return this._statusCode || 200; }
    status(code) {
        this._statusCode = code;
        return this;
    }
    toType(contentType) {
        this._headers['content-type'] = contentType;
        return this;
    }
    toJson(data) {
        this.toType('application/json');
        this._body = JSON.stringify(data ? data : this._body);
        return this;
    }
}
exports.Response = Response;
exports.response = function (body) {
    return new Response(body);
};
