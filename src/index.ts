import { App } from './core'
import { AppOptions } from './interfaces'

// Export Routes
export { view, response, Route as route } from './core'
// Export Middleware
export * from './middleware'

export const run = function () { App.run() }