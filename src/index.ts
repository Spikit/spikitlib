import { App } from './core'
import { AppOptions } from './interfaces'
export { Document, Schema } from 'mongoose'

// Export Routes
export { Route as route, Controller, Model, Password, Auth } from './core'
export { view, response, download } from './core/responses'
export { SpikitRequest as Request } from './interfaces'
// Export Middleware
import { Ajax, Auth, Locale, UserAuth } from './middleware'

export const middleware = {
  ajax: Ajax,
  auth: Auth,
  locale: Locale,
  userAuth: UserAuth
}

export const run = function (projectRoot: string, appRoot: string) { App.run(projectRoot, appRoot) }