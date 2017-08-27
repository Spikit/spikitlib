"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
var mongoose_1 = require("mongoose");
exports.Schema = mongoose_1.Schema;
var core_2 = require("./core");
exports.route = core_2.Route;
exports.Controller = core_2.Controller;
exports.Model = core_2.Model;
var responses_1 = require("./core/responses");
exports.view = responses_1.view;
exports.response = responses_1.response;
exports.download = responses_1.download;
const middleware_1 = require("./middleware");
exports.middleware = {
    ajax: middleware_1.Ajax,
    auth: middleware_1.Auth,
    locale: middleware_1.Locale,
};
exports.run = function (projectRoot, appRoot) { core_1.App.run(projectRoot, appRoot); };
