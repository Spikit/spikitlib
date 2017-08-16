"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../core/App");
class Locale {
    static handle(req, res, next) {
        if (!req.cookies.locale) {
            req.locale = App_1.App.options.app.locale;
            res.cookie('locale', req.locale);
        }
        else {
            req.locale = req.cookies.locale;
        }
        next();
    }
}
exports.Locale = Locale;
