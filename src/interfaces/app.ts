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

export interface AppMongoConnection {
  name: string
  host: string
  port: number
  collection: string
  default: boolean
}

export interface AppMongo {
  enabled: boolean
  connections: AppMongoConnection[]
}
export interface AppOptions {
  app: AppMainOptions
  view: AppViewOptions
  server: AppServerOptions
  sass: { enabled: boolean, sass: any }
  typescript: { enabled: boolean, roots: string[] }
  kernel: AppKernel
  mongo: AppMongo
}