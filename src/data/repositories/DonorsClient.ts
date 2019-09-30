import { injectable } from 'tsyringe'
import { State } from './StateProvider'
import Axios, { AxiosInstance } from 'axios'
import { AppConfig } from '../../app.config'
import { APIError } from '../errors/APIError'
import { Proposal } from '../../domain/Proposal'
import { decodeProposalString } from '../../utils/decodeProposalString'

export interface ProposalResponse {
  metadata: {
    searchTerms: string
    searchURL: string
    totalProposals: number
    index: number
    max: number
    breadcrumb: Array<string[]>
  }
  proposals: Proposal[]
}

interface RawProposalResponse {
  searchTerms: string
  searchURL: string
  totalProposals: string,
  index: string,
  max: string,
  breadcrumb: Array<string[]>
  proposals: Proposal[]
}

@injectable()
export class DonorsClient {
  private readonly client: AxiosInstance

  constructor (private readonly state: State) {
    this.client = Axios.create({ baseURL: this.state.donorsChoose.baseApiUri, params: { APIKey: this.state.donorsChoose.apiKey } })
  }

  private sanitizeResponse (data: RawProposalResponse) {
    const { proposals, ...metadata } = data
    const parsedResponse: ProposalResponse = {
      metadata: {
        ...metadata,
        totalProposals: parseInt(metadata.totalProposals, 10),
        index: parseInt(metadata.index, 10),
        max: parseInt(metadata.max, 10)
      },
      proposals: proposals.map(decodeProposalString)
    }

    return parsedResponse
  }

  async getProposalsByZipcode () {
    try {
      this.state.load()
      const { data } = await this.client.get<RawProposalResponse>('/json_feed.html', { params: { zip: `"${this.state.selectedUser!.zipcode}"` } })
      return this.sanitizeResponse(data)
    } catch (error) {
      if (error.response) throw new APIError(error.response)
      throw error
    }
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
