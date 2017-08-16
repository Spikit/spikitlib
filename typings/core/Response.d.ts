export default class Response {
    private _headers;
    private _body;
    readonly body: any;
    readonly headers: any;
    constructor(body?: any);
    toType(contentType: string): this;
    toJson(data?: any): this;
}
