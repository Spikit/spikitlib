import { Helper } from '../Helper'

export default class Slug extends Helper {
  public name = 'slug'
  public helper(str: string) {
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