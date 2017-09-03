export declare class Response {
    private _headers;
    private _body;
    private _redirection;
    private _statusCode;
    readonly body: any;
    readonly headers: any;
    readonly statusCode: number;
    readonly redirection: string;
    constructor(body?: any);
    status(code: number): this;
    toType(contentType: string): this;
    toJson(data?: any): this;
    redirect(location: string): this;
}
export declare const response: (body?: any) => Response;
