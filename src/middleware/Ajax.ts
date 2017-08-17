import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from './Middleware'

import { response } from '../core/Response'

export class Ajax extends Middleware {
  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    if (req.xhr) {
      next()
    } else {
      res.status(400)
      // return response().status(400)
    }
  }
}