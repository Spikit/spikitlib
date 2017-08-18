"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
class Ajax extends Middleware_1.Middleware {
    handle(req, res, next) {
        if (req.xhr) {
            next();
        }
        else {
            res.status(400);
        }
    }
}
exports.Ajax = Ajax;
