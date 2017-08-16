import { App, View } from './core'
import { AppOptions } from './interfaces'

// Export Routes
// export { AppOptions } from './interfaces'
export { view, response, Route as route } from './core'
// Export Middleware
export * from './middleware'

export const init = function (options: AppOptions) { App.init(options) }
export const start = function () { App.start() }