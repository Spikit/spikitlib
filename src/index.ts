import { App, AppOptions } from './core/App'
import Response from './core/Response'
import View from './core/View'

// Export Routes
export { Route as route, RouteGroup } from './core/Route'

export const init = function (options: AppOptions) { App.init(options) }
export const start = function () { App.start() }

export const response = function (body?: any) {
  return new Response(body)
}

export const view = function (path: string, data?: object) {
  return new View(path, data)
}