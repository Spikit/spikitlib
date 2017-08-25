"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("../../core/Route");
const Url_1 = require("./Url");
const Helper_1 = require("../Helper");
const regex = /:.\w+/g;
class Route extends Helper_1.Helper {
    constructor(currentRoute) {
        super();
        this.name = 'route';
        this.currentRoute = '';
        this.currentRoute = currentRoute;
    }
    helper(name, ...args) {
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
        route = this.replaceRouteParams(route, args);
        return new Url_1.Url(this.currentRoute).helper(route);
    }
    replaceRouteParams(route, args) {
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
exports.Route = Route;
