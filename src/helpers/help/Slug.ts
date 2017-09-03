import { Helper } from '../Helper'

export default class Slug extends Helper {
  public name = 'slug'
  public help(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }
}