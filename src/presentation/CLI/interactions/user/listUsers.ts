import { UserService } from '../../../../services/UserService'

export function listUsers (service: UserService) {
  return console.log(service.listUsers())
}
