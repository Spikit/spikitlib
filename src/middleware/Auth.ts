import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from './Middleware'

export class Auth extends Middleware {
  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    if (req.auth.check()) {
      next()
    } else {
      res.redirect('/')
    }
  }
}