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
const Model_1 = require("../core/Model");
const Password_1 = require("../core/Password");
class Auth extends Model_1.Model {
    constructor() {
        super(...arguments);
        this.collection = 'auth';
        this.name = 'auth';
        this.schema = Model_1.Model.createSchema({
            email: {
                required: true,
                type: String
            },
            password: {
                required: true,
                type: String
            }
        }, { timestamps: true });
        this.authField = 'email';
        this.authPassField = 'password';
    }
    login(auth, authPass) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = {};
            obj[this.authField] = auth;
            let user = yield this.findOne(obj);
            if (user && Password_1.Password.verify(authPass, user.password)) {
                return user;
            }
            return null;
        });
    }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                let user = new this.model;
                user[this.authField] = req.body.email;
                user[this.authPassField] = Password_1.Password.hash(req.input('password'));
                user.validate((err) => __awaiter(this, void 0, void 0, function* () {
                    (!err && user.save((err, obj) => {
                        resolve(obj);
                    })) || resolve(null);
                }));
            });
        });
    }
}
exports.Auth = Auth;
