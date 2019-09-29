import { injectable } from 'tsyringe'
import { State } from './StateProvider'
import Axios, { AxiosInstance } from 'axios'
import { AppConfig } from '../../app.config'

@injectable()
export class DonorsClient {
  private readonly client: AxiosInstance

  constructor (private readonly state: State) {
    this.client = Axios.create({ baseURL: this.state.donorsChoose.baseApiUri, params: { APIKey: this.state.donorsChoose.apiKey } })
  }

  get apiKey () {
    return this.state.donorsChoose.apiKey
  }

  get baseUri () {
    return this.state.donorsChoose.baseApiUri
  }

  async updateConfig (config: AppConfig['data']['donorsChoose']) {
    this.state.donorsChoose = config
    await this.state.save()
  }
}
