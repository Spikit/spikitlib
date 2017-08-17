import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'

export class Ajax {
  public static handle(req: SpikitRequest, res: Response, next: NextFunction) {
    if (req.xhr) {
      next()
    } else {
      res.sendStatus(400)
    }
  }

}