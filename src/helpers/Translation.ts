import * as path from 'path'

export class Translation {
  public static get(key: string, fallback: string = '') {
    let parts = key.split('.')
    let transKey = parts.pop()
    let file = require(path.join(process.cwd(), 'resources/lang', parts.join('/'), '.json'))
    console.log(file)
  }
}