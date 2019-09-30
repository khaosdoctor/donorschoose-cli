import { injectable } from 'tsyringe'
import { GoogleClient } from '../data/repositories/GoogleClient'
import { AppConfig } from '../app.config'

@injectable()
export class GoogleService {

  constructor (private readonly client: GoogleClient) { }

  getConfig () {
    return {
      apiKey: this.client.apiKey,
      baseApiUri: this.client.baseUri
    }
  }

  async updateConfig (config: AppConfig['data']['google']) {
    return this.client.updateConfig(config)
  }

  async getMap (lat: string, long: string, schoolName: string) {
    return this.client.getMapURL(lat, long, schoolName)
  }
}
