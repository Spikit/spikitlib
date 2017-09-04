import { Router, RequestHandler } from 'express'
import * as express from 'express'
import { App } from '../App'
import { Route } from './Route'
import { Middleware } from '../../middleware/Middleware'

export class SpikitRouter {
  private _path: string = ''
  private _router: Router
  private _controllers: { controller: RequestHandler, type: string }[] = []
  private _middleware: string[] = []

  public constructor(path: string, groupMiddleware?: string[]) {
    this._path = path
    this._router = express.Router()
    groupMiddleware && groupMiddleware.forEach(m => this._middleware.push(m))
  }

  public apply() {
    // this.applyMiddleware()
    this._controllers.forEach(c => {
      switch (c.type) {
        case 'get': this._router.get(this._path, ...this.applyMiddleware(), c.controller); break;
        case 'post': this._router.post(this._path, ...this.applyMiddleware(), c.controller); break;
        case 'put': this._router.put(this._path, ...this.applyMiddleware(), c.controller); break;
        case 'delete': this._router.delete(this._path, ...this.applyMiddleware(), c.controller); break;
        case 'patch': this._router.patch(this._path, ...this.applyMiddleware(), c.controller); break;
        case 'all': this._router.all(this._path, ...this.applyMiddleware(), c.controller); break;
      }
    })
    App.express.use('/', this._router)
  }

  private applyMiddleware(): RequestHandler[] {
    let handlers: RequestHandler[] = []
    Route.currentMiddleware.forEach(m => {
      try {
        let mw = new App.kernel.routeMiddleware[m] as Middleware;
        handlers.push(mw.handle.bind(mw))
      } catch (e) {
        throw new Error(`Middleware "${m}" could not be found`)
      }
    })
    this._middleware.forEach(m => {
      try {
        let mw = new App.kernel.routeMiddleware[m] as Middleware;
        handlers.push(mw.handle.bind(mw))
      } catch (e) {
        throw new Error(`Middleware "${m}" could not be found`)
      }
    })
    return handlers
  }

  public name(name: string) {
    Route.routeNames.push({
      name: name,
      route: this._path
    })
    return this
  }

  public middleware(...routeMiddleware: string[]) {
    this._middleware = routeMiddleware
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