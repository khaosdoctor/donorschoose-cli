import { UserService } from '../../../../services/UserService'
import { Logger } from '../../../../utils/logger'
import inquirer = require('inquirer')

export async function chooseUser (service: UserService, logger: Logger) {
  const users = service.listUsers()
  if (users.length <= 0) return logger.error('There are no users registered, please register a new user before selecting')

  const answer = await inquirer.prompt([{
    type: 'list',
    message: 'Select an user to be the new active user:',
    name: 'chosenUser',
    choices: users.map(user => ({ name: `${user.name} <${logger.chalk.yellow(user.email)}>`, value: user.id }))
  }])

  await service.selectUser(answer.chosenUser)
  return logger.success(`User with ID ${logger.chalk.bold.magenta(answer.chosenUser)} is now the active user`)
}
