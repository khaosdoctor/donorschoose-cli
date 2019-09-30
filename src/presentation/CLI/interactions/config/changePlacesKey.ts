import inquirer from 'inquirer'
import { Logger } from '../../../../utils/logger'
import { GoogleService } from '../../../../services/GoogleService'

export async function changePlacesKey (service: GoogleService, logger: Logger) {
  const currentConfigs = service.getConfig()
  let updatedConfig = await inquirer.prompt([
    {
      type: 'input',
      message: 'New API key (ENTER to leave as it is):',
      default: currentConfigs.apiKey,
      name: 'apiKey'
    }
  ])

  const updateObject: typeof currentConfigs = {
    ...currentConfigs,
    apiKey: updatedConfig.apiKey as string
  }

  await service.updateConfig(updateObject)
  return logger.success('API key changed successfuly!')
}
