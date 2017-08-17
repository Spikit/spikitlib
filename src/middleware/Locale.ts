import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { App } from '../core'

export class Locale {

  public static handle(req: SpikitRequest, res: Response, next: NextFunction) {
    // If no locale is set, set a default
    let isSetPath = req.path.match(/\/locale\/(.+)/)
    if (isSetPath && isSetPath[1]) {
      req.locale = isSetPath[1]
      res.cookie('locale', req.locale)
      res.redirect('/')
    } else {
      if (!req.cookies.locale) {
        // Save the locale to the current request
        req.locale = App.options.app.locale
        // Save the locale to the users cookie
        res.cookie('locale', req.locale)
      } else {
        req.locale = req.cookies.locale
      }
    }
    next()
  }
}