"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const _1 = require(".");
const helpers_1 = require("../helpers");
class Route {
    static get routeNames() {
        return this._routeNames;
    }
    static group(options, callback) {
        let currentGroup = this.currentGroup;
        let currentPrefix = this.currentPrefix;
        let currentMiddleware = this.currentMiddleware;
        let routeGroup = new RouteGroup;
        routeGroup.options = options;
        this.currentGroup = routeGroup;
        this.currentPrefix = path.join(this.currentPrefix, routeGroup.options.prefix || '').replace(/\\/g, '/');
        if (options.middleware) {
            this.currentMiddleware = this.currentMiddleware.concat(options.middleware);
        }
        callback(routeGroup);
        this.currentPrefix = currentPrefix;
        this.currentGroup = currentGroup;
        this.currentMiddleware = currentMiddleware;
        return this;
    }
    static get(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        let router = new SpikitRouter(this.lastRoute);
        router.get((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        _1.App.express.use(router.use);
        return router;
    }
    static post(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        _1.App.express.post(this.lastRoute, this.currentMiddleware, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Route._runRoute(controller, req, res);
            });
        });
        return this;
    }
    static put(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        _1.App.express.put(this.lastRoute, this.currentMiddleware, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Route._runRoute(controller, req, res);
            });
        });
        return this;
    }
    static delete(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        _1.App.express.delete(this.lastRoute, this.currentMiddleware, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Route._runRoute(controller, req, res);
            });
        });
        return this;
    }
    static patch(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        _1.App.express.patch(this._getPath(routePath), this.currentMiddleware, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Route._runRoute(controller, req, res);
            });
        });
        return this;
    }
    static all(routePath, controller) {
        this.lastRoute = this._getPath(routePath);
        _1.App.express.all(this._getPath(routePath), this.currentMiddleware, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Route._runRoute(controller, req, res);
            });
        });
        return this;
    }
    static routeName(name) {
        this._routeNames.push({
            name: name,
            route: this.lastRoute
        });
        return this;
    }
    static _runController(req, res, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof controller == 'function') {
                let response = yield controller(req);
                if (response instanceof _1.View) {
                    if (res.statusCode == 200) {
                        let trans = new helpers_1.Translation(req.locale || 'en');
                        response.data['route'] = helpers_1.Urls.route;
                        response.data['url'] = helpers_1.Urls.url;
                        response.data['slug'] = helpers_1.Strings.slug;
                        response.data['trans'] = trans.get.bind(trans);
                        response.data['path'] = path;
                        response.data['session'] = req.session;
                        response.data['params'] = req.params;
                        response.data['body'] = req.body;
                        res.render(response.path, response.data);
                    }
                }
                else if (response instanceof _1.Response) {
                    res.sendStatus(response.statusCode);
                    for (let h in response.headers) {
                        res.setHeader(h, response.headers[h]);
                    }
                    res.send(response.body || '');
                }
                else {
                    res.sendStatus(200);
                }
                return response;
            }
            let error = new _1.View('error.404');
            res.status(404);
            res.render(error.path);
            return error;
        });
    }
    static _runRoute(controller, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            _1.App.host = `${req.protocol}://${req.get('host')}`;
            controller = yield Route._getController(controller);
            let response = yield Route._runController(req, res, controller);
            if (!response) {
                res.sendStatus(500);
            }
        });
    }
    static _getPath(routePath) {
        if (Route.currentGroup) {
            routePath = path.join('/', Route.currentPrefix || '', routePath).replace(/\\/g, '/');
        }
        return routePath;
    }
    static _getController(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof controller == 'string') {
                controller = yield Route._getControllerFromString(controller);
            }
            return controller;
        });
    }
    static _getControllerFromString(string) {
        return __awaiter(this, void 0, void 0, function* () {
            let section = string.split('@');
            let ctrlPath = section[0].replace(/\./g, '/');
            let ctrlMethod = section[1];
            let file = path.join(_1.App.appRoot, '/http/controllers/', ctrlPath);
            let ctrl = yield require(file);
            let ctrlClass = path.parse(file).base;
            return ctrl[ctrlClass].prototype[ctrlMethod];
        });
    }
}
Route._routeNames = [];
Route.currentGroup = null;
Route.currentMiddleware = [];
Route.currentPrefix = '';
Route.lastRoute = '';
exports.Route = Route;
class SpikitRouter {
    constructor(path) {
        this._path = '';
        this._path = path;
        this._router = express.Router();
    }
    get use() {
        return this._router;
    }
    middleware(...routeMiddleware) {
        routeMiddleware.forEach(m => {
            let mw = new _1.App.kernel.routeMiddleware[m];
            if (mw) {
                this._router.use(mw.handle.bind(mw));
            }
            else {
                throw new Error(`Middleware "${m}" could not be found`);
            }
        });
        return this;
    }
    get(controller) {
        this._router.get(this._path, controller);
        return this;
    }
}
exports.SpikitRouter = SpikitRouter;
class RouteGroup extends Route {
    constructor() {
        super(...arguments);
        this.options = { prefix: '', middleware: [] };
    }
    get(routePath, controller) {
        return Route.get(routePath, controller);
    }
    post(routePath, controller) {
        return Route.post(routePath, controller);
    }
    put(routePath, controller) {
        return Route.put(routePath, controller);
    }
    delete(routePath, controller) {
        return Route.delete(routePath, controller);
    }
    patch(routePath, controller) {
        return Route.patch(routePath, controller);
    }
    all(routePath, controller) {
        return Route.all(routePath, controller);
    }
    group(options, callback) {
        return Route.group(options, callback);
    }
}
exports.RouteGroup = RouteGroup;
