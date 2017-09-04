import { Response as ExpressResponse, NextFunction } from 'express'
import * as path from 'path'
import * as url from 'url'
import * as express from 'express'
import * as glob from 'glob'

import { App } from '../'
import { SpikitRouter } from './Router'
import { View, Response, Download } from '../responses'
// import { Slug, Url, Route, Translation } from '../helpers'
import { Helper } from '../../helpers/Helper'
import { SpikitRequest, RouteGroupOptions, RouteController } from '../../interfaces'
import { MiddlewareType } from '../../interfaces'
import { Middleware } from '../../middleware/Middleware'

export abstract class Route {

  // private static routes: RouteGroup[] = []
  // private static groupId: number = 0
  protected static _routeNames: { name: string, route: string }[] = []
  public static get routeNames() {
    return this._routeNames
  }

  protected static _currentGroup: RouteGroup | null = null
  protected static _currentMiddleware: string[] = []// ((req: SpikitRequest, res: ExpressResponse, next: NextFunction) => void)[] = []
  protected static _currentPrefix: string = ''
  protected static _lastRoute: string = ''
  protected static _router: SpikitRouter | null = null

  public static get router(): SpikitRouter | null {
    return this._router
  }

  public static get currentMiddleware(): string[] {
    return this._currentMiddleware
  }

  public static group(options: RouteGroupOptions, callback: (route: RouteGroup) => void) {
    let currentGroup = this._currentGroup
    let currentPrefix = this._currentPrefix
    let currentMiddleware = this._currentMiddleware
    let routeGroup = new RouteGroup
    routeGroup.options = options
    this._currentGroup = routeGroup
    this._currentPrefix = path.join(this._currentPrefix, routeGroup.options.prefix || '').replace(/\\/g, '/')
    if (options.middleware) {
      this._currentMiddleware = this._currentMiddleware.concat(options.middleware)
    }
    callback(routeGroup)
    this._currentPrefix = currentPrefix
    this._currentGroup = currentGroup
    this._currentMiddleware = currentMiddleware
    return this
  }

  public static get(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.get(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static post(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.post(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static put(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.put(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static delete(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.delete(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static patch(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.patch(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static all(routePath: string, controller: RouteController | string) {
    Route.applyCurrentRoute()
    this._lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this._lastRoute, this._currentMiddleware)
    this._router.all(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static applyCurrentRoute() {
    if (this.router) {
      this.router.apply()
      this._router = null
    }
  }

  private static async _runController(req: SpikitRequest, res: ExpressResponse, controller: RouteController): Promise<Response | View | void> {
    if (typeof controller == 'function') {
      let response = await controller(req)
      if (response instanceof Response) {
        res.status(response.statusCode)
      }
      if (response instanceof View) {
        glob(__dirname + '/../../helpers/help/**/*.js', (err, files) => {
          files.forEach(file => {
            let helper = require(file).default
            let h = new helper()
            if (h instanceof Helper) {
              if (typeof h.init == 'function') {
                h.init(req)
              }
              if (response instanceof View) {
                response.data[h.name] = h.help.bind(h)
              }
            }
          })
          if (response instanceof View) {
            response.data['session'] = req.session
            response.data['params'] = req.params
            response.data['body'] = req.body
            response.data['env'] = process.env
            res.render(response.path, response.data)
          }
        })
      } else if (response instanceof Download) {
        res.download(response.downloadPath, response.filename)
      } else if (response instanceof Response) {
        if (response.redirection) {
          res.redirect(response.redirection)
        } else {
          for (let h in response.headers) {
            res.setHeader(h, response.headers[h])
          }
          res.send(response.body || '')
        }
      } else {
        res.sendStatus(200)
      }
      return response
    }
    let error = new View('error.404')
    res.status(404)
    res.render(error.path)
    return error
  }

  private static async _runRoute(controller: RouteController | string, req: SpikitRequest, res: ExpressResponse) {
    let response
    try {
      App.host = `${req.protocol}://${req.get('host')}`
      controller = await Route._getController(controller)
      response = await Route._runController(req, res, controller)
    } catch (e) {
      console.error(e.stack)
    }
    if (!response) { res.sendStatus(500) }
  }

  private static _getPath(routePath: string) {
    if (Route._currentGroup) {
      routePath = path.join('/', Route._currentPrefix || '', routePath).replace(/\\/g, '/')
    }
    return routePath
  }

  private static async _getController(controller: RouteController | string): Promise<RouteController> {
    if (typeof controller == 'string') {
      controller = await Route._getControllerFromString(controller)
    }
    return controller
  }

  private static async _getControllerFromString(string: string): Promise<RouteController> {
    let section = string.split('@')
    let ctrlPath = section[0].replace(/\./g, '/')
    let ctrlMethod = section[1]
    let file = path.join(App.appRoot, '/http/controllers/', ctrlPath)
    let ctrl = await require(file)
    let ctrlClass = path.parse(file).base
    return ctrl[ctrlClass].prototype[ctrlMethod]
  }

}

export class RouteGroup extends Route {
  public options: RouteGroupOptions = { prefix: '', middleware: [] }

  public get(routePath: string, controller: RouteController | string) {
    return Route.get(routePath, controller)
  }

  public post(routePath: string, controller: RouteController | string) {
    return Route.post(routePath, controller)
  }

  public put(routePath: string, controller: RouteController | string) {
    return Route.put(routePath, controller)
  }

  public delete(routePath: string, controller: RouteController | string) {
    return Route.delete(routePath, controller)
  }

  public patch(routePath: string, controller: RouteController | string) {
    return Route.patch(routePath, controller)
  }

  public all(routePath: string, controller: RouteController | string) {
    return Route.all(routePath, controller)
  }

  public group(options: RouteGroupOptions, callback: (route: RouteGroup) => void) {
    return Route.group(options, callback)
  }
}