import { injectable } from 'tsyringe'
import { DonorsClient } from '../data/repositories/DonorsClient'

@injectable()
export class DonorsChooseService {
  constructor (private readonly client: DonorsClient) { }
}
