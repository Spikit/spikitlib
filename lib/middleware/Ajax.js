"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
    static handle(req, res, next) {
        if (req.xhr) {
            next();
        }
        else {
            res.sendStatus(400);
        }
    }
}
exports.Ajax = Ajax;
