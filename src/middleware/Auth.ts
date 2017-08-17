import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from '.'

export class Auth extends Middleware {
  public static handle(req: SpikitRequest, res: Response, next: NextFunction) {
    if (req.session) {
      next()
    } else {
      res.redirect('/')
    }
  }

}