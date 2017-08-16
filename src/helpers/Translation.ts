import * as path from 'path'

export class Translation {
  private locale: string = 'en'

  public constructor(locale: string) {
    this.locale = locale
  }

  public get(key: string, fallback: string = '') {
    let parts = key.split('.')
    let transKey = parts.pop()
    let file = require(path.join(process.cwd(), 'resources/lang', this.locale, parts.join('/'), '.json'))
    console.log(file)
  }
}