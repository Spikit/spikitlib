"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    constructor(request) {
        this.authField = 'email';
        this.authPassField = 'password';
        this._request = request;
    }
    check() {
        return this._request.session && this._request.session[this.authField];
    }
}
exports.Auth = Auth;
