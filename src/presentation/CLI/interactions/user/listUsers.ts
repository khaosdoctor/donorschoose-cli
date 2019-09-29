import { UserService } from '../../../../services/UserService'
import chalk from 'chalk'

export function listUsers (service: UserService) {
  const users = service.listUsers()
  if (!users.length) return console.log(chalk.red('There are no registered users, please register a new user'))

  console.log(chalk.bold.greenBright('These are the currently registered users:'))
  for (let user of users) {
    console.log(`${user.id} - ${user.name} <${user.email}> (zipcode: ${user.zipcode})`)
  }
}
