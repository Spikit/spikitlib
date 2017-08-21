import { Response } from './Response'

export class Download extends Response {
  private _downloadPath: string = ''
  private _filename: string = ''

  public get downloadPath(): string {
    return this._downloadPath
  }

  public get filename(): string {
    return this._filename
  }

  public constructor(filename: string, downloadPath: string, ) {
    super()
    this._downloadPath = downloadPath
  }
}

export const download = function (filename: string, downloadPath: string, ) {
  return new Download(filename, downloadPath)
}