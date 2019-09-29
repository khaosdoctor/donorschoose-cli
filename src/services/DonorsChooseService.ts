import { injectable } from 'tsyringe'
import { DonorsClient } from '../data/repositories/DonorsClient'
import { AppConfig } from '../app.config'

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
}
