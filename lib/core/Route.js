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
const glob = require("glob");
const _1 = require(".");
const responses_1 = require("./responses");
const Helper_1 = require("../helpers/Helper");
class Route {
    static get routeNames() {
        return this._routeNames;
    }
    static get router() {
        return this._router;
    }
    static get currentMiddleware() {
        return this._currentMiddleware;
    }
    static group(options, callback) {
        let currentGroup = this._currentGroup;
        let currentPrefix = this._currentPrefix;
        let currentMiddleware = this._currentMiddleware;
        let routeGroup = new RouteGroup;
        routeGroup.options = options;
        this._currentGroup = routeGroup;
        this._currentPrefix = path.join(this._currentPrefix, routeGroup.options.prefix || '').replace(/\\/g, '/');
        if (options.middleware) {
            this._currentMiddleware = this._currentMiddleware.concat(options.middleware);
        }
        callback(routeGroup);
        this._currentPrefix = currentPrefix;
        this._currentGroup = currentGroup;
        this._currentMiddleware = currentMiddleware;
        return this;
    }
    static get(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static post(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static put(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.put((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static delete(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.delete((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static patch(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.patch((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static all(routePath, controller) {
        Route.applyCurrentRoute();
        this._lastRoute = this._getPath(routePath);
        this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware);
        this._router.all((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield Route._runRoute(controller, req, res);
        }));
        return this._router;
    }
    static applyCurrentRoute() {
        if (this.router) {
            this.router.apply();
            this._router = null;
        }
    }
    static _runController(req, res, controller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof controller == 'function') {
                let response = yield controller(req);
                if (response instanceof responses_1.Response) {
                    res.status(response.statusCode);
                }
                if (response instanceof responses_1.View) {
                    glob(__dirname + '/../helpers/help/**/*.js', (err, files) => {
                        files.forEach(file => {
                            let helper = require(file).default;
                            let h = new helper();
                            if (h instanceof Helper_1.Helper) {
                                if (typeof h.init == 'function') {
                                    h.init(req);
                                }
                                if (response instanceof responses_1.View) {
                                    response.data[h.name] = h.help.bind(h);
                                }
                            }
                        });
                        if (response instanceof responses_1.View) {
                            response.data['session'] = req.session;
                            response.data['params'] = req.params;
                            response.data['body'] = req.body;
                            response.data['env'] = process.env;
                            res.render(response.path, response.data);
                        }
                    });
                }
                else if (response instanceof responses_1.Download) {
                    res.download(response.downloadPath, response.filename);
                }
                else if (response instanceof responses_1.Response) {
                    if (response.redirection) {
                        res.redirect(response.redirection);
                    }
                    else {
                        for (let h in response.headers) {
                            res.setHeader(h, response.headers[h]);
                        }
                        res.send(response.body || '');
                    }
                }
                else {
                    res.sendStatus(200);
                }
                return response;
            }
            let error = new responses_1.View('error.404');
            res.status(404);
            res.render(error.path);
            return error;
        });
    }
    static _runRoute(controller, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                _1.App.host = `${req.protocol}://${req.get('host')}`;
                controller = yield Route._getController(controller);
                response = yield Route._runController(req, res, controller);
            }
            catch (e) {
                console.error(e.stack);
            }
            if (!response) {
                res.sendStatus(500);
            }
        });
    }
    static _getPath(routePath) {
        if (Route._currentGroup) {
            routePath = path.join('/', Route._currentPrefix || '', routePath).replace(/\\/g, '/');
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
Route._currentGroup = null;
Route._currentMiddleware = [];
Route._currentPrefix = '';
Route._lastRoute = '';
Route._router = null;
exports.Route = Route;
class SpikitRouter {
    constructor(path, groupMiddleware) {
        this._path = '';
        this._controllers = [];
        this._middleware = [];
        this._path = path;
        this._router = express.Router();
        groupMiddleware.forEach(m => this._middleware.push(m));
    }
    apply() {
        this._controllers.forEach(c => {
            switch (c.type) {
                case 'get':
                    this._router.get(this._path, ...this.applyMiddleware(), c.controller);
                    break;
                case 'post':
                    this._router.post(this._path, ...this.applyMiddleware(), c.controller);
                    break;
                case 'put':
                    this._router.put(this._path, ...this.applyMiddleware(), c.controller);
                    break;
                case 'delete':
                    this._router.delete(this._path, ...this.applyMiddleware(), c.controller);
                    break;
                case 'patch':
                    this._router.patch(this._path, ...this.applyMiddleware(), c.controller);
                    break;
                case 'all':
                    this._router.all(this._path, ...this.applyMiddleware(), c.controller);
                    break;
            }
        });
        _1.App.express.use('/', this._router);
    }
    applyMiddleware() {
        let handlers = [];
        Route.currentMiddleware.forEach(m => {
            try {
                let mw = new _1.App.kernel.routeMiddleware[m];
                handlers.push(mw.handle.bind(mw));
            }
            catch (e) {
                throw new Error(`Middleware "${m}" could not be found`);
            }
        });
        this._middleware.forEach(m => {
            try {
                let mw = new _1.App.kernel.routeMiddleware[m];
                handlers.push(mw.handle.bind(mw));
            }
            catch (e) {
                throw new Error(`Middleware "${m}" could not be found`);
            }
        });
        return handlers;
    }
    name(name) {
        Route.routeNames.push({
            name: name,
            route: this._path
        });
        return this;
    }
    middleware(...routeMiddleware) {
        this._middleware = routeMiddleware;
        return this;
    }
    get(controller) {
        this._controllers.push({ controller: controller, type: 'get' });
        return this;
    }
    post(controller) {
        this._controllers.push({ controller: controller, type: 'post' });
        return this;
    }
    put(controller) {
        this._controllers.push({ controller: controller, type: 'put' });
        return this;
    }
    delete(controller) {
        this._controllers.push({ controller: controller, type: 'delete' });
        return this;
    }
    patch(controller) {
        this._controllers.push({ controller: controller, type: 'patch' });
        return this;
    }
    all(controller) {
        this._controllers.push({ controller: controller, type: 'all' });
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
