import { Logger } from '../../../../utils/logger'
import { UserService } from '../../../../services/UserService'

export function listUsers (service: UserService, logger: Logger) {
  const users = service.listUsers()
  if (!users.length) return logger.error('There are no registered users, please register a new user')
  const activeUser = service.getActiveUser()
  let activeStatus = ''

  logger.success('These are the currently registered users:')
  for (let user of users) {
    if (activeUser && activeUser.id === user.id) activeStatus = `[${logger.chalk.bold.underline.green('Active')}]`
    logger.message(`${logger.chalk.bold.magenta(user.id)} - ${user.name} <${logger.chalk.yellow(user.email)}> (zipcode: ${user.zipcode}) ${activeStatus}`)
  }
}
