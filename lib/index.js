"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
var core_2 = require("./core");
exports.route = core_2.Route;
var responses_1 = require("./core/responses");
exports.view = responses_1.view;
exports.response = responses_1.response;
exports.download = responses_1.download;
const m = require("./middleware");
exports.middleware = {
    ajax: m.Ajax,
    auth: m.Auth,
    locale: m.Locale,
};
exports.run = function (projectRoot, appRoot) { core_1.App.run(projectRoot, appRoot); };
