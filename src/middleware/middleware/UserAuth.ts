import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../../interfaces'
import { Middleware } from '../Middleware'
import { Auth as auth } from '../../core'
import { SpikitRouter } from '../../core/route/Router'
import { Auth as AuthModel } from '../../models'

export class UserAuth extends Middleware {

  public loginRedirectSuccess: string = '/home'
  public loginRedirectFail: string = '/auth/login'
  public logoutRedirect: string = '/'
  public registerRedirectSuccess: string = '/auth/login'
  public registerRedirectFail: string = '/auth/register'

  public constructor() {
    super()
    this._login()
    this._logout()
    this._register()
  }

  public handle(req: SpikitRequest, res: Response, next: NextFunction) {
    req.auth = new auth(req)
    next()
  }

  private _register() {
    let router = new SpikitRouter('/auth/register')
    router.all((async (req: SpikitRequest, res: Response) => {
      let user = await new AuthModel().register(req)
      if (user) {
        if (req.xhr) {
          return res.send({ success: true })
        } else {
          return res.redirect(this.registerRedirectSuccess)
        }
      } else {
        if (req.xhr) {
          return res.send({ success: false })
        } else {
          return res.redirect(this.registerRedirectFail)
        }
      }
    }).bind(router))
    router.apply()
  }

  private _login() {
    let router = new SpikitRouter('/auth/login')
    router.post((async (req: SpikitRequest, res: Response) => {
      let user = new AuthModel
      let uAuth = await user.login(req.body.username, req.body.password)
      if (uAuth && req.session) {
        req.session.user = uAuth
        if (req.xhr) {
          return res.send({ success: true })
        } else {
          return res.redirect(this.loginRedirectSuccess)
        }
      }
      if (req.xhr) {
        return res.send({ success: false })
      } else {
        return res.redirect(this.loginRedirectFail)
      }
    }).bind(router))
    router.apply()
  }

  private _logout() {
    let router = new SpikitRouter('/auth/logout')
    router.all((async (req: SpikitRequest, res: Response, next: NextFunction) => {
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