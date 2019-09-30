import env from 'sugar-env'

export type AppConfig = typeof config

export const config = {
  data: {
    donorsChoose: {
      apiKey: env.get('DATA_DONORSCHOOSE_APIKEY', ''),
      baseApiUri: env.get('DATA_DONORSCHOOSE_BASEAPIURI', 'https://api.donorschoose.org/common/')
    },
    googlePlaces: {
      apiKey: env.get('DATA_GOOGLEPLACES_APIKEY', ''),
      baseApiUri: env.get('DATA_GOOGLEPLACES_BASEAPIURI', 'https://maps.googleapis.com/maps/api/place/')
    }
  }
}
