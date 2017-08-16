"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./core/App");
const Response_1 = require("./core/Response");
const View_1 = require("./core/View");
var Route_1 = require("./core/Route");
exports.route = Route_1.Route;
exports.RouteGroup = Route_1.RouteGroup;
var middleware_1 = require("./middleware/middleware");
exports.Locale = middleware_1.Locale;
exports.init = function (options) { App_1.App.init(options); };
exports.start = function () { App_1.App.start(); };
exports.response = function (body) {
    return new Response_1.default(body);
};
exports.view = function (path, data) {
    return new View_1.default(path, data);
};
