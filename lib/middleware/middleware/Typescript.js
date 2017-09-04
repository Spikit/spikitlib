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
const fs = require("fs");
const glob = require("glob");
const cp = require("child_process");
const path = require("path");
class Typescript extends Middleware_1.Middleware {
    handle(req, res, next) {
        let roots = core_1.App.options.typescript.roots;
        roots.forEach((root) => __awaiter(this, void 0, void 0, function* () {
            yield this._compileTypeScript(root);
        }));
        next();
    }
    _compileTypeScript(root) {
        return new Promise(resolve => {
            glob(`${root}/**/tsconfig.json`, (err, files) => {
                if (err) {
                    throw new Error(err.message);
                }
                let tscPath = this._getTscPath();
                files.forEach((configFile) => __awaiter(this, void 0, void 0, function* () {
                    let cfgDir = path.parse(configFile).dir;
                    let cfg = JSON.parse(fs.readFileSync(configFile).toString());
                    let check = cfg.compilerOptions.outDir || cfg.compilerOptions.outFile || null;
                    let tsDate = yield this._getDirMtime(cfgDir);
                    let jsDate = yield this._getDirMtime(path.resolve(cfgDir, check));
                    if (!jsDate || (tsDate && jsDate && tsDate > jsDate)) {
                        try {
                            cp.execSync(`${tscPath} -p "${configFile}"`);
                        }
                        catch (e) {
                            console.log(e.stdout.toString());
                            console.log(e.stderr.toString());
                        }
                    }
                }));
                return resolve();
            });
        });
    }
    _getDirMtime(path) {
        return new Promise(resolve => {
            try {
                let stat = fs.statSync(path);
                if (stat.isFile()) {
                    return resolve(stat.mtime);
                }
                else if (stat.isDirectory()) {
                    let lastMod = new Date(1970, 0);
                    glob(path + '/**/*.ts', (err, files) => {
                        files.forEach(file => {
                            let stat = fs.statSync(file);
                            if (stat.isFile() && stat.mtime > lastMod) {
                                lastMod = stat.mtime;
                            }
                        });
                        return resolve(lastMod);
                    });
                }
            }
            catch (e) {
                return resolve(null);
            }
        });
    }
    _getTscPath() {
        return path.join(core_1.App.projectRoot, 'node_modules/.bin/tsc').replace(/\\/g, '/');
    }
}
exports.Typescript = Typescript;
