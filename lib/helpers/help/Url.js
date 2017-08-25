"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../../core/App");
const Helper_1 = require("../Helper");
const url = require("url");
const path = require("path");
class Url extends Helper_1.Helper {
    constructor(currentRoute) {
        super();
        this.name = 'url';
        this.currentRoute = '';
        this.currentRoute = currentRoute;
    }
    helper(urlPath) {
        if (urlPath.startsWith('/')) {
            return url.resolve(App_1.App.host, urlPath);
        }
        return url.resolve(App_1.App.host, path.join(this.currentRoute, urlPath));
    }
}
exports.Url = Url;
