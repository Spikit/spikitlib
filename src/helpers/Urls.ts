import { Route } from '../core/Route'
import { App } from '../core/App'
import * as url from 'url'
const regex = /:.\w+/g;

export class Urls {

  public static url(path: string) {
    return url.resolve(App.host, path)
  }

  public static route(name: string, ...args: any[]) {
    let route = ''
    for (let i of Route.routeNames) {
      if (i.name == name) {
        route = i.route
        break
      }
    }
    if (route.length == 0) {
      throw new Error(`Named route '${name}' does not exist`)
    }
    let params = route.match(regex) || []
    if (params.length != args.length) {
      throw new Error('Invalid argument count: route takes ' + params.length + ' arguments but ' + args.length + ' arguments given')
    }

    route = Urls.replaceRouteParams(route, args)
    return Urls.url(route)
  }

  private static replaceRouteParams(route: string, args: any[]) {
    let m
    let newRoute = route
    let i = 0
    while ((m = regex.exec(route)) !== null) {
      m.forEach((match, groupIndex) => {
        newRoute = newRoute.replace(match, args[i].toString())
      });
      i++
    }
    return newRoute
  }
}