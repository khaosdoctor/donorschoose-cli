import { UserService } from './UserService'
import { GoogleService } from './GoogleService'
import { injectable, container } from 'tsyringe'
import { DonorsChooseService } from './DonorsChooseService'

@injectable()
export default class Services {
  static get userService () {
    return container.resolve(UserService)
  }

  static get googleService () {
    return container.resolve(GoogleService)
  }

  static get donorsChooseService () {
    return container.resolve(DonorsChooseService)
  }
}
