"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("./Middleware");
const core_1 = require("../core");
const Helper_1 = require("../helpers/Helper");
const glob = require("glob");
class Helpers extends Middleware_1.Middleware {
    handle(req, res, next) {
        glob(__dirname + '/../helpers/help/**/*.js', (err, files) => {
            files.forEach(file => {
                let helper = require(file).default;
                let h = new helper();
                if (h instanceof Helper_1.Helper) {
                    if (typeof h.init == 'function') {
                        h.init(req);
                    }
                    core_1.App.express.locals[h.name] = h.helper.bind(h);
                }
            });
            next();
        });
    }
}
exports.Helpers = Helpers;
