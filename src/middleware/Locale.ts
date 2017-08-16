import { Request, Response, NextFunction } from 'express'
import { App } from '../core/App'
import * as sessions from 'express-session'

export interface SpikitRequest extends Request {
  locale: string
}

export class Locale {
  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    // If no locale is set, set a default
    if (!req.cookies.locale) {
      // Save the locale to the current request
      req.locale = App.options.app.locale
      // Save the locale to the users cookie
      res.cookie('locale', req.locale)
    }
    next()
  }
}