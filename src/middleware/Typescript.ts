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
        files.forEach(configFile => {
          // let cfg = this.rebuildConfig(configFile)
          // console.log(cfg)
          cp.execSync(`${tscPath} -p '${configFile}'`)
        })
      })
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
    return path.join(App.projectRoot, 'node_modules/.bin/tsc').replace('\\', '/')
  }
}