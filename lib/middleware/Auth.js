"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
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
