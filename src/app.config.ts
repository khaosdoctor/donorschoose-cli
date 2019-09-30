import env from 'sugar-env'

export type AppConfig = typeof config

export const config = {
  data: {
    donorsChoose: {
      apiKey: env.get('DATA_DONORSCHOOSE_APIKEY', ''),
      baseApiUri: env.get('DATA_DONORSCHOOSE_BASEAPIURI', 'https://api.donorschoose.org/common/')
    },
    google: {
      apiKey: env.get('DATA_GOOGLE_APIKEY', ''),
      baseApiUri: env.get('DATA_GOOGLE_BASEAPIURI', 'https://maps.googleapis.com/maps/api/geocode/')
    }
  }
}
