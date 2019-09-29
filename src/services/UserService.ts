import { injectable } from 'tsyringe'
import { CreateUserData, User } from '../domain/User'
import { UserRepository } from '../data/repositories/UserRepository'
import { UserNotFoundError } from '../domain/errors/UserNotFoundError'
import { UserAlreadyExistsError } from '../domain/errors/UserAlreadyExistsError'

@injectable()
export class UserService {
  constructor (private readonly repository: UserRepository) { }

  listUsers () {
    return this.repository.listUsers()
  }

  countUsers () {
    return this.repository.countUsers()
  }

  async addUser (userData: CreateUserData) {
    const existingUser = this.repository.findBy('email', userData.email)
    if (existingUser) throw new UserAlreadyExistsError('email', userData.email)

    const user = new User(userData)
    return this.repository.addUser(user)
  }

  async removeUser (id: string) {
    const activeUser = this.repository.getActiveUser()
    if (activeUser && activeUser.id === id) await this.repository.clearActiveUser()
    return this.repository.deleteById(id)
  }

  async updateUser (userId: string, updatedData: Omit<CreateUserData, 'id'>) {
    this.findById(userId)

    const userData = {
      id: userId,
      ...updatedData
    }
    const updatedUser = new User(userData)
    await this.repository.updateUser(updatedUser)

    const activeUser = this.repository.getActiveUser()
    if (activeUser && activeUser.id === updatedUser.id) await this.repository.selectUser(updatedUser)
    return updatedUser
  }

  findById (id: string) {
    const user = this.repository.findById(id)
    if (!user) throw new UserNotFoundError(id)
    return user
  }

  async clearActiveUser () {
    return this.repository.clearActiveUser()
  }

  getActiveUser () {
    return this.repository.getActiveUser()
  }

  async selectUser (id: string) {
    const user = this.findById(id)
    await this.repository.selectUser(user)
    return user
  }
}
