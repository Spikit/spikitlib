import { Request } from 'express'
import { App } from '../core'

export class Auth {

  protected authField: string = 'email'
  protected authPassField: string = 'password'

  protected _request: Request

  public constructor(request: Request) {
    this._request = request
  }

  public check() {
    return this._request.session && this._request.session.user
  }
}