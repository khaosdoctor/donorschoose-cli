import { Logger } from '../../../../utils/logger'
import { GoogleService } from '../../../../services/GoogleService'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'

export function listConfig (googleService: GoogleService, donorsService: DonorsChooseService, logger: Logger) {
  const config = {
    google: googleService.getConfig(),
    donors: donorsService.getConfig()
  }

  logger.success('These are the current client configs...')
  logger.warn('Donors Choose config:', 4)
  logger.info(`API Key: ${logger.chalk.bold.magenta(config.donors.apiKey)}`, 6)
  logger.info(`Base API URL: ${logger.chalk.bold.magenta(config.donors.baseApiUri)}`, 6)
  logger.warn('Google config:', 4)
  logger.info(`API Key: ${logger.chalk.bold.magenta(config.google.apiKey)}`, 6)
  logger.info(`Base API URL: ${logger.chalk.bold.magenta(config.google.baseApiUri)}`, 6)
  return
}
