import * as cryptojs from 'crypto-js'
import { Helper } from '../../Helper'

export default class Sha1 extends Helper {

  public name: string = 'sha256'

  public help(str: string): string {
    return cryptojs.SHA256(str).toString()
  }

}