import { addUser } from '../user/addUser'
import { chooseUser } from '../user/chooseUser'
import { Logger } from '../../../../utils/logger'
import { UserService } from '../../../../services/UserService'

export async function userOnboarding (userService: UserService, logger: Logger) {
  if (!userService.listUsers().length) {
    logger.warn('There are no users registered, let us register one...')
    await addUser(userService, logger)
  }

  if (!userService.getActiveUser()) {
    logger.warn('You must set an active user in order to fetch data from the API')
    await chooseUser(userService, logger)
  }
}
