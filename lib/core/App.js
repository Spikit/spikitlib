"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const sass = require("node-sass-middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");
const glob = require("glob");
const Route_1 = require("./route/Route");
const middleware_1 = require("../middleware");
class App {
    static get express() {
        return this._express;
    }
    static get options() {
        return this._options;
    }
    static get appRoot() {
        return this._appRoot;
    }
    static get projectRoot() {
        return this._projectRoot;
    }
    static get kernel() {
        return this._options.kernel;
    }
    static run(projectRoot, appRoot) {
        this._appRoot = appRoot;
        this._projectRoot = projectRoot;
        this.init({
            app: require(path.join(appRoot, '/config/app')).default,
            view: require(path.join(appRoot, '/config/view')).default,
            server: require(path.join(appRoot, '/config/server')).default,
            sass: require(path.join(appRoot, '/config/sass')).default,
            typescript: require(path.join(appRoot, '/config/typescript')).default,
            mongo: require(path.join(appRoot, '/config/mongo')).default,
            session: require(path.join(appRoot, '/config/session')).default,
            kernel: require(path.join(appRoot, '/http/Kernel')).default
        });
        glob(path.join(appRoot, '/routes/**/*.js'), (err, files) => {
            files.forEach(file => require(file));
            Route_1.Route.applyCurrentRoute();
            this.start();
        });
    }
    static init(options) {
        this._options = options;
        this._express = express();
        this._express.use(cookieParser());
        if (options.session.enabled) {
            this._express.use(session(options.session.session));
        }
        if (options.sass.enabled) {
            this._express.use(sass(options.sass.sass));
        }
        if (options.typescript.enabled) {
            let tsc = new middleware_1.Typescript;
            this._express.use(tsc.handle.bind(tsc));
        }
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(bodyParser.json());
        this._express.use(compression());
        options.app.static.forEach(file => {
            this._express.use(express.static(file));
        });
        options.kernel.middleware.forEach(m => {
            let mw = new m;
            this._express.use(mw.handle.bind(mw));
        });
        this._express.use((req, res, next) => {
            req.input = function (key, fallback = '') {
                return req.params[key] || req.body[key] || fallback;
            };
            next();
        });
        this._express.set('view engine', options.view.engine);
        this._express.set('views', options.view.paths);
        this._server = options.server;
        this._express.locals.basedir = options.view.basedir;
        this._connectToMogo();
    }
    static _connectToMogo() {
        if (this.options.mongo.enabled) {
            let conn = this.options.mongo.connection;
            let mongoose = require('mongoose');
            mongoose.Promise = global.Promise;
            let connectionString = `mongodb://${conn.host}:${conn.port}/${conn.collection}`;
            mongoose.connect(connectionString, (err) => {
                if (err) {
                    console.log(new Error().stack);
                }
                else {
                    console.log(`Connected to the database: ${connectionString}`);
                }
            });
        }
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
App._appRoot = '';
App._projectRoot = '';
exports.App = App;
