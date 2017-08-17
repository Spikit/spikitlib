"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sass = require("node-sass-middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");
const glob = require("glob");
class App {
    static get express() {
        return this._express;
    }
    static get options() {
        return this._options;
    }
    static run() {
        this.init({
            app: require(path.join(global.appRoot, '/config/app')).default,
            view: require(path.join(global.appRoot, '/config/view')).default,
            server: require(path.join(global.appRoot, '/config/server')).default,
            sass: require(path.join(global.appRoot, '/config/sass')).default,
            kernel: require(path.join(global.appRoot, '/http/Kernel')).default
        });
        glob(path.join(global.appRoot, '/routes/**/*.js'), (err, files) => {
            files.forEach(file => require(file));
            this.start();
        });
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
        options.app.static.forEach(file => {
            this._express.use(express.static(file));
        });
        options.kernel.middleware.forEach(m => {
            this._express.use(m.handle);
        });
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
