"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class Password {
    static hash(password) {
        return bcrypt.hashSync(password, 10);
    }
    static verify(password, hash) {
        return bcrypt.compareSync(password, hash) || false;
    }
}
exports.Password = Password;
