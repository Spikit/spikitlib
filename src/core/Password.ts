import * as bcrypt from 'bcrypt'

export class Password {

  public static hash(password: string) {
    return bcrypt.hashSync(password, 10)
  }

  public static verify(password: string, hash: string) {
    return bcrypt.compareSync(password, hash) || false
  }

}