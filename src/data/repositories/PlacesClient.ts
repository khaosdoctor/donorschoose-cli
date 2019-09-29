import { injectable } from 'tsyringe'
import { State } from './StateProvider'
import Axios, { AxiosInstance } from 'axios'
import { AppConfig } from '../../app.config'

@injectable()
export class PlacesClient {
  private readonly client: AxiosInstance

  constructor (private readonly state: State) {
    this.client = Axios.create({ baseURL: this.state.googlePlaces.baseApiUri, params: { key: this.state.googlePlaces.apiKey } })
  }

  get apiKey () {
    return this.state.googlePlaces.apiKey
  }

  get baseUri () {
    return this.state.googlePlaces.baseApiUri
  }

  async updateConfig (config: AppConfig['data']['googlePlaces']) {
    this.state.googlePlaces = config
    await this.state.save()
  }
}
