import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'

export class Auth {
  public static handle(req: SpikitRequest, res: Response, next: NextFunction) {
    if (req.session) {
      next()
    } else {
      res.redirect('/')
    }
  }

}