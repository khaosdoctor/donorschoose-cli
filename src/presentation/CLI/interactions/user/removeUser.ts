import { UserService } from '../../../../services/UserService'
import { Logger } from '../../../../utils/logger'
import inquirer from 'inquirer'

export async function removeUser (service: UserService, logger: Logger) {
  try {
    const users = service.listUsers()
    if (!users.length) return logger.error('There are no registered users, please register an user in order to delete it')

    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'selectedUser',
      message: 'Please select an user to delete',
      choices: users.map(user => ({ name: `${user.id} - ${user.name} <${user.email}>`, value: user.id }))
    }])

    await service.removeUser(answer.selectedUser)
    return logger.success(`User ${logger.chalk.bold.magenta(answer.selectedUser)} was removed`)
  } catch (error) {
    return logger.error(error.message)
  }
}
