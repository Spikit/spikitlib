import { Request } from 'express'
import { Document, Schema } from 'mongoose'
import { Model } from '../core/Model'
import { Password } from '../core/Password'

export interface UserAuth extends Document {
  email: string
  password: string
}

export class Auth extends Model<UserAuth>{

  protected collection: string = 'auth'
  protected name: string = 'auth'
  protected schema: Schema = Model.createSchema({
    email: {
      required: true,
      type: String
    },
    password: {
      required: true,
      type: String
    }
  }, { timestamps: true })

  protected authField: string = 'email'
  protected authPassField: string = 'password'

  public async login(auth: any, authPass: string): Promise<UserAuth | null> {
    let obj: any = {}
    obj[this.authField] = auth
    let user = await this.findOne(obj)
    if (user && Password.verify(authPass, user.password)) {
      return user
    }
    return null
  }

  public async register(req: Request) {
    console.log(this.model)
  }

}