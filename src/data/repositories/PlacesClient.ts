import { injectable } from 'tsyringe'
import { State } from './State'

@injectable()
export class PlacesClient {
  constructor (private readonly state: State) { }
}
