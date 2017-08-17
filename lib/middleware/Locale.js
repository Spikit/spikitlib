"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const _1 = require(".");
class Locale extends _1.Middleware {
    static handle(req, res, next) {
        let isSetPath = req.path.match(/\/locale\/(.+)/);
        if (isSetPath && isSetPath[1]) {
            req.locale = isSetPath[1];
            res.cookie('locale', req.locale);
            res.redirect('/');
        }
        else {
            if (!req.cookies.locale) {
                req.locale = core_1.App.options.app.locale;
                res.cookie('locale', req.locale);
            }
            else {
                req.locale = req.cookies.locale;
            }
        }
        next();
    }
}
exports.Locale = Locale;
