import { App } from '../../core/App'
import { Helper } from '../Helper'
import * as url from 'url'
import * as path from 'path'

export default class Url extends Helper {
  public name = 'url'
  public currentRoute = ''

  public constructor(currentRoute: string) {
    super()
    this.currentRoute = currentRoute
  }

  public helper(urlPath: string) {
    if (urlPath.startsWith('/')) {
      return url.resolve(App.host, urlPath)
    }
    return url.resolve(App.host, path.join(this.currentRoute, urlPath))
  }
}