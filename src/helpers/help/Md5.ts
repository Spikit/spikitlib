import { MD5 } from 'crypto-js'
import { Helper } from '../Helper'

export default class Md5 extends Helper {
  public name = 'md5'
  public help(str: string): string {
    return MD5(str).toString()
  }
}