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
const Middleware_1 = require("./Middleware");
const core_1 = require("../core");
const Router_1 = require("../core/route/Router");
const models_1 = require("../models");
class UserAuth extends Middleware_1.Middleware {
    constructor() {
        super(...arguments);
        this.loginRedirectSuccess = '/home';
        this.loginRedirectFail = '/auth/login';
        this.logoutRedirect = '/';
    }
    handle(req, res, next) {
        req.auth = new core_1.Auth(req);
        this._login(req, res);
        this._logout(req, res, next);
        next();
    }
    _login(req, res) {
        let router = new Router_1.SpikitRouter('/auth/login');
        router.post(((req) => __awaiter(this, void 0, void 0, function* () {
            let user = yield new models_1.Auth();
            let uAuth = user.login(req.body.username, req.body.password);
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
    _logout(req, res, next) {
        let router = new Router_1.SpikitRouter('/auth/logout');
        router.get(((req) => __awaiter(this, void 0, void 0, function* () {
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
