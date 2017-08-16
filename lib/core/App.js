"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sass = require("node-sass-middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
class App {
    static get express() {
        return this._express;
    }
    static get options() {
        return this._options;
    }
    static init(options) {
        this._options = options;
        this._express = express();
        this._express.use(cookieParser());
        if (options.sass.enabled) {
            this._express.use(sass(options.sass));
        }
        this._express.use(bodyParser.json());
        this._express.use(compression());
        options.static.forEach(file => {
            this._express.use(express.static(file));
        });
        this._express.use(options.kernel.middleware);
        this._express.set('view engine', options.view.engine);
        this._express.set('views', options.view.paths);
        this._server = options.server;
        this._express.locals.basedir = options.view.basedir;
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
