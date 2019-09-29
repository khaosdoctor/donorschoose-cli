import { injectable } from 'tsyringe'
import { PlacesClient } from '../data/repositories/PlacesClient'
import { AppConfig } from '../app.config'

@injectable()
export class PlacesService {

  constructor (private readonly client: PlacesClient) { }

  getConfig () {
    return {
      apiKey: this.client.apiKey,
      baseApiUri: this.client.baseUri
    }
  }

  async updateConfig (config: AppConfig['data']['googlePlaces']) {
    return this.client.updateConfig(config)
  }
}
