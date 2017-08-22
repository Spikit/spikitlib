import * as express from 'express'
import { Express, RequestHandler } from 'express'
import * as session from 'express-session'
import * as sass from 'node-sass-middleware'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as path from 'path'
import * as glob from 'glob'
let tsc = require('typescript-middleware')

import { AppOptions, AppServerOptions, AppKernel } from '../interfaces'
import { Route } from './Route'

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

  public static get kernel(): AppKernel {
    return this._options.kernel
  }

  public static run(projectRoot: string, appRoot: string) {
    this._appRoot = appRoot
    this._projectRoot = projectRoot
    this.init({
      app: require(path.join(appRoot, '/config/app')).default,
      view: require(path.join(appRoot, '/config/view')).default,
      server: require(path.join(appRoot, '/config/server')).default,
      sass: require(path.join(appRoot, '/config/sass')).default,
      typescript: require(path.join(appRoot, '/config/typescript')).default,
      kernel: require(path.join(appRoot, '/http/Kernel')).default
    })
    glob(path.join(appRoot, '/routes/**/*.js'), (err, files: string[]) => {
      files.forEach(file => require(file))
      Route.applyRoute()
      this.start()
    })
  }

  public static init(options: AppOptions) {
    this._options = options
    this._express = express()

    // Parse cookies
    this._express.use(cookieParser())

    // Enable sass if it is enabled:
    // https://github.com/Spikit/spikit/blob/master/src/config/sass.ts
    if (options.sass.enabled) {
      this._express.use(sass(options.sass))
    }

    // Enable sass if it is enabled:
    // https://github.com/Spikit/spikit/blob/master/src/config/typescript.ts
    if (options.typescript.enabled) {
      this._express.use('typescript', tsc(options.typescript.tsc))
    }

    // Enable the body parser for forms
    this._express.use(bodyParser.urlencoded({ extended: false }))
    // Enable the body parser for json
    this._express.use(bodyParser.json())

    // Enable compression to compress responses
    this._express.use(compression())

    // Setup the static routes
    // https://github.com/Spikit/spikit/blob/master/src/config/app.ts
    options.app.static.forEach(file => {
      this._express.use(express.static(file))
    })

    // Setup the applications middleware
    // This is the middleware is run on every request
    // To modify the middleware view the Kernel file:
    // https://github.com/Spikit/spikit/blob/master/src/http/Kernel.ts
    options.kernel.middleware.forEach(m => {
      let mw = new m
      this._express.use(mw.handle.bind(mw));
    })

    // Setup the view engine
    this._express.set('view engine', options.view.engine)
    this._express.set('views', options.view.paths)

    // Setup the server options
    // https://github.com/Spikit/spikit/blob/master/src/config/server.ts
    this._server = options.server

    // Set the basedir for the views
    // https://github.com/Spikit/spikit/blob/master/src/config/view.ts
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