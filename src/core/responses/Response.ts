export class Response {

  private _headers: any = {}
  private _body: any
  private _redirection: string
  private _statusCode: number
  public get body() { return this._body }
  public get headers() { return this._headers }
  public get statusCode() { return this._statusCode || 200 }
  public get redirection() { return this._redirection }

  public constructor(body?: any) {
    this._body = body
  }

  public status(code: number) {
    this._statusCode = code
    return this
  }

  public toType(contentType: string) {
    this._headers['content-type'] = contentType
    return this
  }

  public toJson(data?: any) {
    this.toType('application/json')
    this._body = JSON.stringify(data ? data : this._body)
    return this
  }

  public redirect(location: string) {
    this._redirection = location
    return this
  }

}

export const response = function (body?: any) {
  return new Response(body)
}