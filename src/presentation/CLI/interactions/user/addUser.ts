import inquirer from 'inquirer'
import { Logger } from '../../../../utils/logger'
import { CreateUserData } from '../../../../domain/User'
import { UserService } from '../../../../services/UserService'

async function testEmail (input: string) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input) || 'Invalid Email'
}

export async function addUser (service: UserService, logger: Logger) {
  try {
    const answers: CreateUserData = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the user:'
      },
      {
        type: 'input',
        name: 'email',
        message: `Type the user's email:`,
        validate: testEmail
      },
      {
        type: 'input',
        name: 'zipcode',
        message: `Type the user's zipcode`,
        validate: async (input) => /(?!00[02-5]|099|213|269|34[358]|353|419|42[89]|51[789]|529|53[36]|552|5[67]8|5[78]9|621|6[348]2|6[46]3|659|69[4-9]|7[034]2|709|715|771|81[789]|8[3469]9|8[4568]8|8[6-9]6|8[68]7|9[02]9|987)\d{5}/.test(input) || 'Invalid zipcode'
      }])

    const user = await service.addUser(answers)
    return logger.success(`User ${user.name} was added with id ${user.id}`)
  } catch (error) {
    return logger.error(error.message)
  }
}
