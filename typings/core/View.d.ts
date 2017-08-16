export default class View {
    protected _path: string;
    protected _data: object;
    readonly path: string;
    readonly data: object;
    constructor(path: string, data?: object);
}
