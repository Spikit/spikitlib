import { Router, Request as ExpressRequest, RequestHandler, Response as ExpressResponse, NextFunction } from 'express'
import * as path from 'path'
import * as url from 'url'
import * as express from 'express'

import { App, View, Response } from '.'
import { Strings, Urls, Translation } from '../helpers'
import { SpikitRequest, RouteGroupOptions, RouteController } from '../interfaces'
import { MiddlewareType } from '../interfaces'
import { Middleware } from '../middleware/Middleware'

export class Route {

  // private static routes: RouteGroup[] = []
  // private static groupId: number = 0
  protected static _routeNames: { name: string, route: string }[] = []
  public static get routeNames() {
    return this._routeNames
  }

  protected static currentGroup: RouteGroup | null = null
  protected static currentMiddleware: ((req: SpikitRequest, res: ExpressResponse, next: NextFunction) => void)[] = []
  protected static currentPrefix: string = ''
  protected static lastRoute: string = ''
  protected static _router: SpikitRouter | null = null

  public static get router(): SpikitRouter | null {
    return this._router
  }

  public static group(options: RouteGroupOptions, callback: (route: RouteGroup) => void) {
    let currentGroup = this.currentGroup
    let currentPrefix = this.currentPrefix
    let currentMiddleware = this.currentMiddleware
    let routeGroup = new RouteGroup
    routeGroup.options = options
    this.currentGroup = routeGroup
    this.currentPrefix = path.join(this.currentPrefix, routeGroup.options.prefix || '').replace(/\\/g, '/')
    if (options.middleware) {
      this.currentMiddleware = this.currentMiddleware.concat(options.middleware)
    }
    callback(routeGroup)
    this.currentPrefix = currentPrefix
    this.currentGroup = currentGroup
    this.currentMiddleware = currentMiddleware
    return this
  }

  public static get(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.get(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static post(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.post(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static put(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.put(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static delete(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.delete(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static patch(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.patch(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static all(routePath: string, controller: RouteController | string) {
    Route.applyRoute()
    this.lastRoute = this._getPath(routePath)
    this._router = new SpikitRouter(this.lastRoute)
    this._router.all(async (req: SpikitRequest, res: ExpressResponse, next: NextFunction) => {
      await Route._runRoute(controller, req, res)
    })
    return this._router
  }

  public static routeName(name: string) {
    this._routeNames.push({
      name: name,
      route: this.lastRoute
    })
    return this
  }

  public static applyRoute() {
    if (this.router) {
      this.router.apply()
      this._router = null
    }
  }

  private static async _runController(req: SpikitRequest, res: ExpressResponse, controller: RouteController) {
    if (typeof controller == 'function') {
      let response = await controller(req)
      if (response instanceof View) {
        let trans = new Translation(req.locale || 'en')
        // Url helpers
        // response.data['url'] = url
        response.data['route'] = Urls.route
        response.data['url'] = Urls.url
        // String helpers
        response.data['slug'] = Strings.slug
        response.data['trans'] = trans.get.bind(trans)
        // Path helpers
        response.data['path'] = path
        // Other data
        response.data['session'] = req.session
        response.data['params'] = req.params
        response.data['body'] = req.body
        res.render(response.path, response.data)
      } else if (response instanceof Response) {
        res.status(response.statusCode)
        for (let h in response.headers) {
          res.setHeader(h, response.headers[h])
        }
        res.send(response.body || '')
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
    App.host = `${req.protocol}://${req.get('host')}`
    controller = await Route._getController(controller)
    let response = await Route._runController(req, res, controller)
    if (!response) { res.sendStatus(500) }
  }

  private static _getPath(routePath: string) {
    if (Route.currentGroup) {
      routePath = path.join('/', Route.currentPrefix || '', routePath).replace(/\\/g, '/')
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

export class SpikitRouter {
  private _path: string = ''
  private _router: Router
  private _controllers: { controller: RequestHandler, type: string }[] = []
  private _middleware: string[] = []

  public constructor(path: string) {
    this._path = path
    this._router = express.Router()
  }

  public apply(): Router {
    this.applyMiddleware()
    this._controllers.forEach(c => {
      switch (c.type) {
        case 'get': this._router.get(this._path, c.controller); break;
        case 'post': this._router.post(this._path, c.controller); break;
        case 'put': this._router.put(this._path, c.controller); break;
        case 'delete': this._router.delete(this._path, c.controller); break;
        case 'patch': this._router.patch(this._path, c.controller); break;
        case 'all': this._router.all(this._path, c.controller); break;
      }
    })
    App.express.use(this._router)
    return this._router
  }

  public middleware(...routeMiddleware: string[]) {
    this._middleware = routeMiddleware
    return this
  }

  private applyMiddleware() {
    this._middleware.forEach(m => {
      try {
        let mw = new App.kernel.routeMiddleware[m] as Middleware;
        this._router.use(mw.handle.bind(mw))
      } catch (e) {
        throw new Error(`Middleware "${m}" could not be found`)
      }
    })
    return this
  }

  public get(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'get' })
    return this
  }
  public post(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'post' })
    return this
  }
  public put(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'put' })
    return this
  }
  public delete(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'delete' })
    return this
  }
  public patch(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'patch' })
    return this
  }
  public all(controller: RequestHandler) {
    this._controllers.push({ controller: controller, type: 'all' })
    return this
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