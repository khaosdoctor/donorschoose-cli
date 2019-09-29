import { UserService } from '../../../../services/UserService'
import { Logger } from '../../../../utils/logger'
import inquirer from 'inquirer'
import isEmail from '../../../../utils/isEmail'
import isZipcode from '../../../../utils/isZipcode'

export async function editUser (service: UserService, logger: Logger) {
  try {
    const users = service.listUsers()
    if (!users.length) return logger.error('There are no registered users, please register an user in order to delete it')

    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'selectedUser',
      message: 'Please select an user to edit:',
      choices: users.map(user => ({ name: `${user.id} - ${user.name} <${user.email}>`, value: user.id }))
    }])

    const user = service.findById(answer.selectedUser)

    const update = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'New name (ENTER to leave as it is):',
        default: user.name
      },
      {
        type: 'input',
        name: 'email',
        message: `New email (ENTER to leave as it is):`,
        validate: isEmail,
        default: user.email
      },
      {
        type: 'input',
        name: 'zipcode',
        message: `New zipcode (ENTER to leave as it is):`,
        validate: isZipcode,
        default: user.zipcode
      }])

    await service.updateUser(user.id, update)
    return logger.success(`User ${logger.chalk.bold.magenta(answer.selectedUser)} was removed`)
  } catch (error) {
    return logger.error(error.message)
  }
}
