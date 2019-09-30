import { injectable } from 'tsyringe'
import { State } from './StateProvider'
import Axios, { AxiosInstance } from 'axios'
import { AppConfig } from '../../app.config'
import { APIError } from '../errors/APIError'

export interface GeocodingResults {
  status: string
  error_message?: string
  results: {
    formatted_address: string
    place_id: string
  }[]
}

@injectable()
export class GoogleClient {
  private readonly client: AxiosInstance
  private readonly mapBaseURL: string = 'https://www.google.com/maps/search/?api=1'

  constructor (private readonly state: State) {
    this.client = Axios.create({ baseURL: this.state.google.baseApiUri, params: { key: this.state.google.apiKey } })
  }

  get apiKey () {
    return this.state.google.apiKey
  }

  get baseUri () {
    return this.state.google.baseApiUri
  }

  async updateConfig (config: AppConfig['data']['google']) {
    this.state.google = config
    await this.state.save()
  }

  async getMapURL (lat: string, long: string, schoolName: string) {
    try {
      // I could've used only the query parameter, however, without a place ID, the map details are poor
      const { data } = await this.client.get<GeocodingResults>('/json', { params: { key: this.state.google.apiKey, latlng: `${lat},${long}` } })
      if (data.status !== 'OK' && data.error_message) throw new Error(data.error_message)

      const mapURL = `${this.mapBaseURL}&query=${encodeURIComponent(schoolName)}&ll=${lat},${long}&query_place_id=${data.results[0].place_id}`
      return mapURL
    } catch (error) {
      if (error.response) throw new APIError(error.response)
      throw error
    }
  }
}
