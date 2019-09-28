import { CreateUserData } from '../User'

export class UserAlreadyExistsError extends Error {
  constructor (key: keyof CreateUserData, value: string) {
    super(`User with ${key} ${value} already exists`)
  }
}
