import { State } from './StateProvider'
import { injectable } from 'tsyringe'
import { User, CreateUserData } from '../../domain/User'

@injectable()
export class UserRepository {
  constructor (private readonly state: State) { }

  async addUser (user: User) {
    this.state.users.push(user)
    await this.state.save()
    return user
  }

  listUsers () {
    return this.state.users
  }

  async deleteById (id: string) {
    this.state.users = this.state.users.filter(stateUser => stateUser.id !== id)
    await this.state.save()
    return this.listUsers()
  }

  getActiveUser () {
    return this.state.selectedUser
  }

  findBy (key: keyof CreateUserData, value: string) {
    const user = this.state.users.find((user) => user[key] === value)
    if (!user) return null
    return user
  }

  findById (id: string) {
    const user = this.state.users.find((user) => user.id === id)
    if (!user) return null
    return user
  }

  async updateUser (userToUpdate: User) {
    await this.deleteById(userToUpdate.id)
    await this.addUser(userToUpdate)
    return userToUpdate
  }

  countUsers () {
    return this.state.users.length
  }

  async clearActiveUser () {
    this.state.selectedUser = null
    await this.state.save()
  }

  async selectUser (chosenUser: User) {
    const user = this.findById(chosenUser.id)
    if (!user) return null
    this.state.selectedUser = chosenUser
    await this.state.save()
    return chosenUser
  }

  async save () {
    await this.state.save()
    return this
  }

  async refresh () {
    this.state.load()
    return this
  }
}
