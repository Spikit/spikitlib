import { App } from './core'
import { AppOptions } from './interfaces'

// Export Routes
export { Route as route, Controller, Model } from './core'
export { view, response, download } from './core/responses'
// Export Middleware
import * as m from './middleware'

export const middleware = {
  ajax: m.Ajax,
  auth: m.Auth,
  locale: m.Locale,
}

export const run = function (projectRoot: string, appRoot: string) { App.run(projectRoot, appRoot) }