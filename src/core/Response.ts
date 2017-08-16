export class Response {

  private _headers: any = {}
  private _body: any
  public get body() { return this._body }
  public get headers() { return this._headers }

  public constructor(body?: any) {
    this._body = body
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

}

export const response = function (body?: any) {
  return new Response(body)
}