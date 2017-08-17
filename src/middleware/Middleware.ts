import { Response, NextFunction } from 'express'
import { SpikitRequest } from '../interfaces'

export abstract class Middleware {
  public abstract handle(req: SpikitRequest, res: Response, next: NextFunction);
}