"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("../core/Route");
const App_1 = require("../core/App");
const url = require("url");
const path = require("path");
const regex = /:.\w+/g;
class Urls {
    constructor(currentRoute) {
        this.currentRoute = '';
        this.currentRoute = currentRoute;
    }
    url(urlPath) {
        if (urlPath.startsWith('/')) {
            return url.resolve(App_1.App.host, urlPath);
        }
        return url.resolve(App_1.App.host, path.join(this.currentRoute, urlPath));
    }
    route(name, ...args) {
        let route = '';
        for (let i of Route_1.Route.routeNames) {
            if (i.name == name) {
                route = i.route;
                break;
            }
        }
        if (route.length == 0) {
            throw new Error(`Named route '${name}' does not exist`);
        }
        let params = route.match(regex) || [];
        if (params.length != args.length) {
            throw new Error('Invalid argument count: route takes ' + params.length + ' arguments but ' + args.length + ' arguments given');
        }
        route = Urls.replaceRouteParams(route, args);
        return this.url(route);
    }
    static replaceRouteParams(route, args) {
        let m;
        let newRoute = route;
        let i = 0;
        while ((m = regex.exec(route)) !== null) {
            m.forEach((match, groupIndex) => {
                newRoute = newRoute.replace(match, args[i].toString());
            });
            i++;
        }
        return newRoute;
    }
}
exports.Urls = Urls;
