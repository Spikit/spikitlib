import { Route as routeCore } from '../core/Route'
import { App } from '../core/App'
import { Url } from './Url'
import { Helper } from './Helper'
import * as url from 'url'
import * as path from 'path'
const regex = /:.\w+/g;

export class Route extends Helper {
  public name = 'route'
  public currentRoute = ''

  public constructor(currentRoute) {
    super()
    this.currentRoute = currentRoute
  }

  public helper(name: string, ...args: any[]) {
    let route = ''
    for (let i of routeCore.routeNames) {
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

    route = this.replaceRouteParams(route, args)
    return new Url(this.currentRoute).helper(route)
  }

  private replaceRouteParams(route: string, args: any[]) {
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