export class APIError extends Error {
  constructor (response: any) {
    super(`Could not fetch data from API: error with code ${response.status} - ${response.data}`)
  }
}
