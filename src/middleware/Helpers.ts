import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from './Middleware'
import { App } from '../core'
import { Helper } from '../helpers/Helper'
import { View } from '../core/responses'

import * as glob from 'glob'

export class Helpers extends Middleware {
  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    glob(__dirname + '/../helpers/help/**/*.js', (err, files) => {
      files.forEach(file => {
        let helper = require(file).default
        let h = new helper()
        if (h instanceof Helper) {
          if (typeof h.init == 'function') {
            h.init(req)
          }
          App.express.locals[h.name] = h.helper.bind(h)
        }
      })
      next()
    })
  }
}