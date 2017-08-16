import * as express from 'express'
import { Express, RequestHandler } from 'express'
import * as session from 'express-session'
import * as sass from 'node-sass-middleware'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as path from 'path'

export interface AppMainOptions {
  locale: string
  locales: {}[]
  static: string[]
}

export interface AppServerOptions {
  port: number
}

export interface AppViewOptions {
  engine: string
  paths: string[]
  basedir: string
}

export interface AppKernel {
  middleware: any[]
  middlewareGroups: any[]
}

export interface AppOptions {
  app: AppMainOptions
  view: AppViewOptions
  server: AppServerOptions
  static: string[]
  sass: any
  kernel: AppKernel
}

export class App {

  private static _express: Express
  private static _server: AppServerOptions
  private static _options: AppOptions
  public static host: string = ''

  public static get express(): Express {
    return this._express
  }

  public static get options(): AppOptions {
    return this._options
  }

  public static init(options: AppOptions) {
    this._options = options
    this._express = express()
    this._express.use(cookieParser())
    if (options.sass.enabled) {
      this._express.use(sass(options.sass))
    }
    this._express.use(bodyParser.json())
    this._express.use(compression())
    // Setup the static routes
    options.static.forEach(file => {
      this._express.use(express.static(file))
    })
    this._express.use(options.kernel.middleware)
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