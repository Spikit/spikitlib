"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
class App {
    static get express() {
        return this._express;
    }
    static init(options) {
        this._express = express();
        this._express.use(compression());
        options.static.forEach(file => {
            this._express.use(express.static(file));
        });
        this._express.set('view engine', options.view.engine);
        this._express.set('views', options.view.paths);
        this._server = options.server;
    }
    static set(setting, value) {
        this._express.set(setting, value);
    }
    static use(...handlers) {
        this._express.use(handlers);
    }
    static start() {
        this._express.listen(this._server.port, () => {
            console.log('Server is running on port ' + this._server.port);
        });
    }
}
App.host = '';
exports.App = App;
