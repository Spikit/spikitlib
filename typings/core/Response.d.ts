export declare class Response {
    private _headers;
    private _body;
    private _statusCode;
    readonly body: any;
    readonly headers: any;
    readonly statusCode: number;
    constructor(body?: any);
    status(code: number): this;
    toType(contentType: string): this;
    toJson(data?: any): this;
}
export declare const response: (body?: any) => Response;
