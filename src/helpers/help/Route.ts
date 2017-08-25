import { Route as routeCore } from '../../core/Route'
import { App } from '../../core/App'
import Url from './Url'
import { Helper } from '../Helper'
import { SpikitRequest } from '../../interfaces'
import * as url from 'url'
import * as path from 'path'
const regex = /:.\w+/g;

export default class Route extends Helper {
  public name = 'route'
  public currentRoute = ''
  public req: SpikitRequest

  public init(req: SpikitRequest) {
    this.req = req
    this.currentRoute = req.route.path
  }

  public help(name: string, ...args: any[]) {
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
    let u = new Url
    u.init(this.req)
    u.help(route)
    return u
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