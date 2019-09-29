import inquirer from 'inquirer'
import { Logger } from '../../../../utils/logger'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'

export async function changeDonorsKey (service: DonorsChooseService, logger: Logger) {
  const currentConfigs = service.getConfig()
  let updatedConfig = await inquirer.prompt([
    {
      type: 'input',
      message: 'New base URL (ENTER to leave as it is):',
      default: currentConfigs.apiKey,
      name: 'apiKey'
    }
  ])

  const updateObject: typeof currentConfigs = {
    ...currentConfigs,
    apiKey: updatedConfig.apiKey as string
  }

  await service.updateConfig(updateObject)
  return logger.success('Base URL changed successfuly!')
}
