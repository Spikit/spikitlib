import { Response } from './Response';
export declare class Download extends Response {
    private _downloadPath;
    private _filename;
    readonly downloadPath: string;
    readonly filename: string;
    constructor(filename: string, downloadPath: string);
}
export declare const download: (filename: string, downloadPath: string) => Download;
