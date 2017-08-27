import { App } from '../../core/App'
import { Helper } from '../Helper'
import { SpikitRequest } from '../../interfaces'
import * as url from 'url'
import * as path from 'path'

export default class Url extends Helper {
  public name = 'url'
  public currentRoute = ''

  public init(req: SpikitRequest) {
    this.currentRoute = req.route.path
  }

  public help(urlPath: string) {
    if (urlPath.startsWith('/')) {
      return url.resolve(App.host, urlPath)
    }
    return url.resolve(App.host, path.join(this.currentRoute, urlPath))
  }
}