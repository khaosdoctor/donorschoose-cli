import { injectable } from 'tsyringe'
import { AppConfig } from '../app.config'
import { DonorsClient } from '../data/repositories/DonorsClient'

@injectable()
export class DonorsChooseService {
  constructor (private readonly client: DonorsClient) { }

  getConfig () {
    return {
      apiKey: this.client.apiKey,
      baseApiUri: this.client.baseUri
    }
  }

  async updateConfig (config: AppConfig['data']['donorsChoose']) {
    return this.client.updateConfig(config)
  }

  async getProposalsByZipcode () {
    return this.client.getProposalsByZipcode()
  }
}
