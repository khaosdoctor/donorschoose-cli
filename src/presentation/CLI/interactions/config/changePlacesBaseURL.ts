import inquirer from 'inquirer'
import { Logger } from '../../../../utils/logger'
import { GoogleService } from '../../../../services/GoogleService'

export async function changePlacesBaseURL (service: GoogleService, logger: Logger) {
  const currentConfigs = service.getConfig()
  let updatedConfig = await inquirer.prompt([
    {
      type: 'input',
      message: 'New base URL (ENTER to leave as it is):',
      default: currentConfigs.baseApiUri,
      name: 'baseApiUri'
    }
  ])

  const updateObject: typeof currentConfigs = {
    ...currentConfigs,
    baseApiUri: updatedConfig.baseApiUri as string
  }

  await service.updateConfig(updateObject)
  return logger.success('Base URL changed successfuly!')
}
