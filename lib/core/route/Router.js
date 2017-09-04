"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const App_1 = require("../App");
const Route_1 = require("./Route");
class SpikitRouter {
    constructor(path, groupMiddleware) {
        this._path = '';
        this._controllers = [];
        this._middleware = [];
        this._path = path;
        this._router = express.Router();
        groupMiddleware && groupMiddleware.forEach(m => this._middleware.push(m));
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
        App_1.App.express.use('/', this._router);
    }
    applyMiddleware() {
        let handlers = [];
        Route_1.Route.currentMiddleware.forEach(m => {
            try {
                let mw = new App_1.App.kernel.routeMiddleware[m];
                handlers.push(mw.handle.bind(mw));
            }
            catch (e) {
                throw new Error(`Middleware "${m}" could not be found`);
            }
        });
        this._middleware.forEach(m => {
            try {
                let mw = new App_1.App.kernel.routeMiddleware[m];
                handlers.push(mw.handle.bind(mw));
            }
            catch (e) {
                throw new Error(`Middleware "${m}" could not be found`);
            }
        });
        return handlers;
    }
    name(name) {
        Route_1.Route.routeNames.push({
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
