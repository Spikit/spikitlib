import * as cryptojs from 'crypto-js'
import { Helper } from '../../Helper'

export default class Sha1 extends Helper {

  public name: string = 'sha512'

  public help(str: string): string {
    return cryptojs.SHA512(str).toString()
  }

}