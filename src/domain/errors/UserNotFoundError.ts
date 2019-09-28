export class UserNotFoundError extends Error {
  constructor (id: string) {
    super(`User with ${id} was not found`)
  }
}
