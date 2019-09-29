import { Logger } from '../../../../utils/logger'
import { UserService } from '../../../../services/UserService'

export function listActive (service: UserService, logger: Logger) {
  const user = service.getActiveUser()
  if (!user) return logger.error('There are no active users, please select an user in order to list projects')
  logger.success('Currently active user is:')
  return logger.message(`${logger.chalk.bold.magenta(user.id)} - ${user.name} <${logger.chalk.yellow(user.email)}> (zipcode: ${user.zipcode})`, 4)
}
