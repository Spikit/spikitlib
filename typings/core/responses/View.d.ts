import { Response } from './Response';
export declare class View extends Response {
    protected _path: string;
    protected _data: any;
    protected _response: Response;
    readonly path: string;
    readonly data: any;
    readonly response: Response;
    constructor(path: string, data?: object);
}
export declare const view: (path: string, data?: object | undefined) => View;
