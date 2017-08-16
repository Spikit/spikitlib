import * as express from 'express'
import { Express, RequestHandler } from 'express'
import * as session from 'express-session'
import * as compression from 'compression'
import * as path from 'path'

export interface AppServerOptions {
  port: number
}

export interface AppViewOptions {
  engine: string
  paths: string[]
  basedir: string
}

export interface AppOptions {
  view: AppViewOptions
  server: AppServerOptions
  static: string[]
}

export class App {

  private static _express: Express
  private static _server: AppServerOptions
  public static host: string = ''

  public static get express(): Express {
    return this._express
  }

  public static init(options: AppOptions) {
    this._express = express()
    this._express.use(compression())
    // Setup the static routes
    options.static.forEach(file => {
      this._express.use(express.static(file))
    })
    // Setup the view engine
    this._express.set('view engine', options.view.engine)
    this._express.set('views', options.view.paths)
    this._server = options.server
    this._express.locals.basedir = options.view.basedir
  }

  public static set(setting: string, value: any) {
    this._express.set(setting, value)
  }

  public static use(...handlers: RequestHandler[]) {
    this._express.use(handlers)
  }

  public static start() {
    this._express.listen(this._server.port, () => {
      console.log('Server is running on port ' + this._server.port)
    })
  }

}