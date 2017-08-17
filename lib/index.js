"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
var core_2 = require("./core");
exports.view = core_2.view;
exports.response = core_2.response;
exports.route = core_2.Route;
const m = require("./middleware");
exports.middleware = {
    ajax: m.Ajax,
    auth: m.Auth,
    locale: m.Locale,
};
exports.run = function (projectRoot, appRoot) { core_1.App.run(projectRoot, appRoot); };
