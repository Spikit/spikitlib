import * as path from 'path'
import { App } from '../core'

export class Translation {
  private locale: string = 'en'

  public constructor(locale: string) {
    this.locale = locale
  }

  public get(key: string, fallback: string = '') {
    let parts = key.split('.')
    let transKey = parts.pop()
    try {
      let file = require(path.join(App.projectRoot, 'resources/lang', this.locale, parts.join('/')) + '.json')
      if (file && transKey) {
        return file[transKey] || fallback
      }
    } catch (e) {
      throw new
    }
    return fallback
  }
}