import env from 'sugar-env'

export type AppConfig = typeof config

export const config = {
  data: {
    donorsChoose: {
      apiKey: env.get('DATA_DONORSCHOOSE_APIKEY', '')
    },
    googlePlaces: {
      apiKey: env.get('DATA_GOOGLEPLACES_APIKEY', '')
    }
  }
}
