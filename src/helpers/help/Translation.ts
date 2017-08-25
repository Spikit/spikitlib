import * as path from 'path'
import { App } from '../../core'
import { Helper } from '../Helper'

export default class Translation extends Helper {

  public name = 'trans'

  private locale: string = 'en'

  public constructor(locale: string) {
    super()
    this.locale = locale
  }

  public helper(key: string, fallback: string = '') {
    let parts = key.split('.')
    let transKey = parts.pop()
    try {
      let file = require(path.join(App.projectRoot, 'resources/lang', this.locale, parts.join('/')) + '.json')
      if (file && transKey) {
        return file[transKey] || fallback
      }
    } catch (e) {
      throw new Error(e.message)
    }
    return fallback
  }
}