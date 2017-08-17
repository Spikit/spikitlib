"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Auth extends _1.Middleware {
    static handle(req, res, next) {
        if (req.session) {
            next();
        }
        else {
            res.redirect('/');
        }
    }
}
exports.Auth = Auth;
