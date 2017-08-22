import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from './Middleware'
import { App } from '../core'

import * as fs from 'fs'
import * as glob from 'glob'
import * as cp from 'child_process'
import * as path from 'path'

export class Typescript extends Middleware {

  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    let roots = App.options.typescript.roots
    roots.forEach(async root => {
      await this._compileTypeScript(root)
    })
    next()
  }

  private _compileTypeScript(root: string) {
    return new Promise<void>(resolve => {
      glob(`${root}/**/tsconfig.json`, (err, files) => {
        if (err) { throw new Error(err.message) }
        let tscPath = this._getTscPath()
        files.forEach(async configFile => {
          let cfgDir = path.parse(configFile).dir
          let cfg = JSON.parse(fs.readFileSync(configFile).toString())
          let check = cfg.compilerOptions.outDir || cfg.compilerOptions.outFile || null
          let tsDate = await this._getDirMtime(cfgDir)
          let jsDate = await this._getDirMtime(path.resolve(cfgDir, check))
          if (!jsDate || (tsDate && jsDate && tsDate > jsDate)) {
            cp.execSync(`${tscPath} -p "${configFile}"`)
          }
        })
        return resolve()
      })
    })
  }

  private _getDirMtime(path: string): Promise<Date | null> {
    return new Promise<Date | null>(resolve => {
      try {
        let stat = fs.statSync(path)
        if (stat.isFile()) {
          return resolve(stat.mtime)
        } else if (stat.isDirectory()) {
          let lastMod: Date = new Date(1970, 0)
          glob(path + '/**/*.ts', (err, files) => {
            files.forEach(file => {
              let stat = fs.statSync(file)
              if (stat.isFile() && stat.mtime > lastMod) {
                lastMod = stat.mtime
              }
            })
            return resolve(lastMod)
          })
        }
      } catch (e) {
        return resolve(null)
      }
    })
  }

  private _getTscPath(): string {
    return path.join(App.projectRoot, 'node_modules/.bin/tsc').replace(/\\/g, '/')
  }
}