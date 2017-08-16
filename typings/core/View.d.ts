export default class View {
    protected _path: string;
    protected _data: any;
    readonly path: string;
    readonly data: any;
    constructor(path: string, data?: object);
}
