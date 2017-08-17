import { RequestHandler } from 'express'
import { Middleware } from '../middleware/Middleware'

export interface MiddlewareType<T extends Middleware> {
  new(): T;
}

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

export interface SpikitRequestHandler {
  handle: RequestHandler
}

export interface AppKernel {
  middleware: MiddlewareType<Middleware>[]
  middlewareGroups: any[]
  routeMiddleware: any
}

export interface AppOptions {
  app: AppMainOptions
  view: AppViewOptions
  server: AppServerOptions
  sass: any
  kernel: AppKernel
}