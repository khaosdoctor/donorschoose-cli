import { injectable } from 'tsyringe'
import { State } from './State'

@injectable()
export class DonorsClient {
  constructor (private readonly state: State) { }
}
