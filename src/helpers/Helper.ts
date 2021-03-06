import { SpikitRequest } from '../interfaces/request'
export interface Helper {
  init(req: SpikitRequest): void
}
export abstract class Helper {
  public abstract name = ''
  public abstract help(...args: any[]): any
}