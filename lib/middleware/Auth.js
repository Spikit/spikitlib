"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
class Auth extends Middleware_1.Middleware {
    handle(req, res, next) {
        if (req.auth.check()) {
            next();
        }
        else {
            res.redirect('/');
        }
    }
}
exports.Auth = Auth;
