export default class View {

  protected _path: string = ''
  protected _data: any = {}

  public get path() { return this._path }
  public get data() { return this._data }

  public constructor(path: string, data?: object) {
    this._path = path.replace(/\./g, '/')
    this._data = data || {}
  }
}