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
const fs = require("fs");
const glob = require("glob");
const cp = require("child_process");
const path = require("path");
class Typescript extends Middleware_1.Middleware {
    handle(req, res, next) {
        let roots = core_1.App.options.typescript.roots;
        roots.forEach((root) => __awaiter(this, void 0, void 0, function* () {
            let a = yield this.compileTypeScript(root);
        }));
        next();
    }
    compileTypeScript(root) {
        return new Promise(resolve => {
            glob(`${root}/**/tsconfig.json`, (err, files) => {
                if (err) {
                    throw new Error(err.message);
                }
                let tscPath = this.getTscPath();
                files.forEach(configFile => {
                    cp.execSync(`${tscPath} -p '${configFile}'`);
                });
            });
        });
    }
    rebuildConfig(configFile) {
        let cfg = JSON.parse(fs.readFileSync(configFile).toString());
        cfg.compilerOptions.outDir = path.join(core_1.App.projectRoot, 'public/js');
        let opt = [];
        for (let key in cfg.compilerOptions) {
            let value = cfg.compilerOptions[key];
            opt.push(`--${key}=${value}`);
        }
        return opt.join(' ');
    }
    getTscPath() {
        return path.join(core_1.App.projectRoot, 'node_modules/.bin/tsc').replace('\\', '/');
    }
}
exports.Typescript = Typescript;
