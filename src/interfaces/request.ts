import { Request } from 'express'
import { Auth } from '../core'

export interface SpikitRequest extends Request {
  locale: string
  auth: Auth
}