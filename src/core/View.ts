import { response, Response } from './Response'

export class View {

  protected _path: string = ''
  protected _data: any = {}
  protected _response: Response = response()

  public get path() { return this._path }
  public get data() { return this._data }
  public get response() { return this._response }

  public constructor(path: string, data?: object) {
    this._path = path.replace(/\./g, '/')
    this._data = data || {}
  }
}

export const view = function (path: string, data?: object) {
  return new View(path, data)
}