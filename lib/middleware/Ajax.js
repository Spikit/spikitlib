"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
const Response_1 = require("../core/Response");
class Ajax extends Middleware_1.Middleware {
    handle(req, res, next) {
        if (req.xhr) {
            next();
        }
        else {
            return Response_1.response().status(400);
        }
    }
}
exports.Ajax = Ajax;
