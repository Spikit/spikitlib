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
      let a = await this.compileTypeScript(root)
    })
    next()
  }

  private compileTypeScript(root: string) {
    return new Promise(resolve => {
      glob(`${root}/**/tsconfig.json`, (err, files) => {
        if (err) { throw new Error(err.message) }
        let tscPath = this.getTscPath()
        files.forEach(async configFile => {
          let cfgDir = path.parse(configFile).dir
          let cfg = JSON.parse(fs.readFileSync(configFile).toString())
          let check = cfg.compilerOptions.outDir || cfg.compilerOptions.outFile || null
          let tsDate = await this.getDirMtime(cfgDir)
          let jsDate = await this.getDirMtime(path.resolve(cfgDir, check))
          if (!jsDate || (tsDate && jsDate && tsDate > jsDate)) {
            cp.execSync(`${tscPath} -p "${configFile}"`)
          }
          // let statTs = fs.statSync(cfgDir)
          // let cfg = JSON.parse(fs.readFileSync(configFile).toString())
          // let check = cfg.compilerOptions.outDir || cfg.compilerOptions.outFile || null
          // let statJs: fs.Stats = null
          // if (typeof check == 'string') {
          //   check = path.resolve(cfgDir, check)
          //   try {
          //     statJs = fs.statSync(check)
          //   } catch (e) {
          //     console.log(e.message)
          //   }
          // }
          // if (!statJs || (statTs && statJs && statTs.mtime > statJs.mtime)) {
          //   cp.execSync(`${tscPath} -p "${configFile}"`)
          // }
        })
      })
    })
  }

  private getDirMtime(path: string): Promise<Date | null> {
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
              if (stat.mtime > lastMod) {
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

  private rebuildConfig(configFile: string) {
    let cfg = JSON.parse(fs.readFileSync(configFile).toString())
    cfg.compilerOptions.outDir = path.join(App.projectRoot, 'public/js')
    let opt: string[] = []
    for (let key in cfg.compilerOptions) {
      let value = cfg.compilerOptions[key]
      opt.push(`--${key}=${value}`)
    }
    return opt.join(' ')
  }

  private getTscPath(): string {
    return path.join(App.projectRoot, 'node_modules/.bin/tsc').replace(/\\/g, '/')
  }
}