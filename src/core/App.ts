import * as express from 'express'
import { Express, RequestHandler } from 'express'
import * as session from 'express-session'
import * as sass from 'node-sass-middleware'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as path from 'path'
import * as glob from 'glob'

import { AppOptions, AppServerOptions } from '../interfaces'

export class App {

  private static _express: Express
  private static _server: AppServerOptions
  private static _options: AppOptions
  public static host: string = ''
  private static _appRoot: string = ''
  private static _projectRoot: string = ''

  public static get express(): Express {
    return this._express
  }

  public static get options(): AppOptions {
    return this._options
  }

  public static get appRoot(): string {
    return this._appRoot
  }

  public static get projectRoot(): string {
    return this._projectRoot
  }

  public static run(projectRoot: string, appRoot: string) {
    this._appRoot = appRoot
    this._projectRoot = projectRoot
    this.init({
      app: require(path.join(appRoot, '/config/app')),
      view: require(path.join(appRoot, '/config/view')),
      server: require(path.join(appRoot, '/config/server')),
      sass: require(path.join(appRoot, '/config/sass')),
      kernel: require(path.join(appRoot, '/http/Kernel'))
    })
    glob(path.join(appRoot, '/routes/**/*.js'), (err, files: string[]) => {
      files.forEach(file => require(file))
      this.start()
    })
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
    options.app.static.forEach(file => {
      this._express.use(express.static(file))
    })
    // Setup the applications middleware
    options.kernel.middleware.forEach(m => {
      this._express.use(m.handle);
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