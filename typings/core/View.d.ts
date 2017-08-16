export declare class View {
    protected _path: string;
    protected _data: any;
    readonly path: string;
    readonly data: any;
    constructor(path: string, data?: object);
}
export declare const view: (path: string, data?: object | undefined) => View;
