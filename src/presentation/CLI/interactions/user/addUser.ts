import inquirer from 'inquirer'
import isEmail from '../../../../utils/isEmail'
import { Logger } from '../../../../utils/logger'
import isZipcode from '../../../../utils/isZipcode'
import { CreateUserData } from '../../../../domain/User'
import { UserService } from '../../../../services/UserService'

export async function addUser (service: UserService, logger: Logger) {
  try {
    const answers: CreateUserData = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the user?'
      },
      {
        type: 'input',
        name: 'email',
        message: `What is the user's email?`,
        validate: isEmail
      },
      {
        type: 'input',
        name: 'zipcode',
        message: `And the user's zipcode?`,
        validate: isZipcode
      }])

    const user = await service.addUser(answers)
    return logger.success(`User ${user.name} was added with id ${user.id}`)
  } catch (error) {
    return logger.error(error.message)
  }
}
