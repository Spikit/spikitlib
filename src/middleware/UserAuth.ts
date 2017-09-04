import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'
import { Middleware } from './Middleware'
import { Auth as auth } from '../core'
import { SpikitRouter } from '../core/route/Router'
import { Auth as AuthModel } from '../models'

export class UserAuth extends Middleware {

  public loginRedirectSuccess: string = '/home'
  public loginRedirectFail: string = '/auth/login'
  public logoutRedirect: string = '/'

  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    req.auth = new auth(req)
    this._login(req, res, next)
    this._logout(req, res, next)
    next()
  }

  private _login(req: SpikitRequest, res: Response, next: NextFunction) {
    let router = new SpikitRouter('/auth/login')
    router.post((async (req: SpikitRequest) => {
      let user = await new AuthModel()
      let uAuth = user.login(req.body.username, req.body.password)
      if (uAuth && req.session) {
        req.session.user = uAuth
        if (req.xhr) {
          return res.send({ success: true })
        } else {
          return res.redirect(this.loginRedirectSuccess)
        }
      }
      if (req.xhr) {
        res.send({ success: false })
      } else {
        res.redirect(this.loginRedirectFail)
      }
    }).bind(router))
    router.apply()
  }

  private _logout(req: SpikitRequest, res: Response, next: NextFunction) {
    let router = new SpikitRouter('/auth/logout')
    router.get((async (req: SpikitRequest) => {
      req.session && req.session.destroy(err => {
        if (!err) {
          if (req.xhr) {
            return res.send({ success: true })
          } else {
            return res.redirect(this.logoutRedirect)
          }
        }
        next()
      })
    }).bind(router))
    router.apply()
  }
}