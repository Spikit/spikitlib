"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
var core_2 = require("./core");
exports.view = core_2.view;
exports.response = core_2.response;
exports.route = core_2.Route;
__export(require("./middleware"));
exports.init = function (options) { core_1.App.init(options); };
exports.start = function () { core_1.App.start(); };
