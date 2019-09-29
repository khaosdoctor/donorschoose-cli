import { UserService } from './UserService'
import { PlacesService } from './PlacesService'
import { injectable, container } from 'tsyringe'
import { DonorsChooseService } from './DonorsChooseService'

@injectable()
export default class Services {
  static get userService () {
    return container.resolve(UserService)
  }

  static get placesService () {
    return container.resolve(PlacesService)
  }

  static get donorsChooseService () {
    return container.resolve(DonorsChooseService)
  }
}
