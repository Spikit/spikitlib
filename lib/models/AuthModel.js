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
const _1 = require("../");
class Auth extends _1.Model {
    constructor() {
        super(...arguments);
        this.collection = 'auth';
        this.name = 'auth';
        this.schema = _1.Model.createSchema({
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
            if (user && _1.Password.verify(authPass, user.password)) {
                return user;
            }
            return null;
        });
    }
}
exports.Auth = Auth;
