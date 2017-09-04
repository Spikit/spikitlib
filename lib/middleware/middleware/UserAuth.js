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
const Middleware_1 = require("../Middleware");
const core_1 = require("../../core");
const Router_1 = require("../../core/route/Router");
const models_1 = require("../../models");
class UserAuth extends Middleware_1.Middleware {
    constructor() {
        super();
        this.loginRedirectSuccess = '/home';
        this.loginRedirectFail = '/auth/login';
        this.logoutRedirect = '/';
        this.registerRedirectSuccess = '/auth/login';
        this.registerRedirectFail = '/auth/register';
        this._login();
        this._logout();
        this._register();
    }
    handle(req, res, next) {
        req.auth = new core_1.Auth(req);
        next();
    }
    _register() {
        let router = new Router_1.SpikitRouter('/auth/register');
        router.all(((req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = yield new models_1.Auth().register(req);
            if (user) {
                if (req.xhr) {
                    return res.send({ success: true });
                }
                else {
                    return res.redirect(this.registerRedirectSuccess);
                }
            }
            else {
                if (req.xhr) {
                    return res.send({ success: false });
                }
                else {
                    return res.redirect(this.registerRedirectFail);
                }
            }
        })).bind(router));
        router.apply();
    }
    _login() {
        let router = new Router_1.SpikitRouter('/auth/login');
        router.post(((req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = new models_1.Auth;
            let uAuth = yield user.login(req.body.username, req.body.password);
            if (uAuth && req.session) {
                req.session.user = uAuth;
                if (req.xhr) {
                    return res.send({ success: true });
                }
                else {
                    return res.redirect(this.loginRedirectSuccess);
                }
            }
            if (req.xhr) {
                return res.send({ success: false });
            }
            else {
                return res.redirect(this.loginRedirectFail);
            }
        })).bind(router));
        router.apply();
    }
    _logout() {
        let router = new Router_1.SpikitRouter('/auth/logout');
        router.all(((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.session && req.session.destroy(err => {
                if (!err) {
                    if (req.xhr) {
                        return res.send({ success: true });
                    }
                    else {
                        return res.redirect(this.logoutRedirect);
                    }
                }
                next();
            });
        })).bind(router));
        router.apply();
    }
}
exports.UserAuth = UserAuth;
