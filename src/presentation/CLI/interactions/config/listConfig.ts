import { Logger } from '../../../../utils/logger'
import { GoogleService } from '../../../../services/GoogleService'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'

export function listConfig (placesService: GoogleService, donorsService: DonorsChooseService, logger: Logger) {
  const config = {
    places: placesService.getConfig(),
    donors: donorsService.getConfig()
  }

  logger.success('These are the current client configs...')
  logger.warn('Donors Choose config:', 4)
  logger.info(`API Key: ${logger.chalk.bold.magenta(config.donors.apiKey)}`, 6)
  logger.info(`Base API URL: ${logger.chalk.bold.magenta(config.donors.baseApiUri)}`, 6)
  logger.warn('Google Places config:', 4)
  logger.info(`API Key: ${logger.chalk.bold.magenta(config.places.apiKey)}`, 6)
  logger.info(`Base API URL: ${logger.chalk.bold.magenta(config.places.baseApiUri)}`, 6)
  return
}
