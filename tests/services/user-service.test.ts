import 'reflect-metadata'
import sinon from 'sinon'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { UserService } from '../../src/services/UserService'
import { User, CreateUserData } from '../../src/domain/User'
import { State } from '../../src/data/repositories/StateProvider'
import { UserRepository } from '../../src/data/repositories/UserRepository'
import { UserAlreadyExistsError } from '../../src/domain/errors/UserAlreadyExistsError'
const userData: CreateUserData = {
  email: 'test@test.com',
  name: 'test',
  zipcode: '09123'
}
const existingUser = new User(userData)

describe('Adding users', () => {
  const userRepository = new UserRepository(sinon.spy() as unknown as State)
  const userService = new UserService(userRepository)

  it('Should add a new user', async () => {
    const addUserStub = sinon.stub(userRepository, 'addUser').callsFake(async (user: User) => user)
    const findByStub = sinon.stub(userRepository, 'findBy').returns(null)

    const result = await userService.addUser(userData)

    expect(result).to.be.instanceOf(User)
    expect(addUserStub.called).to.equal(true)
    expect(addUserStub.args[0][0]).to.have.property('id', result.id)
    expect(findByStub.called).to.equal(true)
    expect(findByStub.args[0][1]).to.equal(userData.email)
    addUserStub.restore()
    findByStub.restore()
  })

  it('Should not add an existing user', async () => {
    const addUserStub = sinon.stub(userRepository, 'addUser').callsFake(async (user: User) => user)
    const findByStub = sinon.stub(userRepository, 'findBy').returns(existingUser)

    try {
      await userService.addUser(userData)
    } catch (error) {
      expect(error).to.be.instanceOf(UserAlreadyExistsError)
      expect(addUserStub.called).to.equal(false)
      expect(findByStub.called).to.equal(true)
      expect(findByStub.args[0][1]).to.equal(userData.email)
    } finally {
      findByStub.restore()
      addUserStub.restore()
    }
  })
})

describe('Removing users', () => {
  const userRepository = new UserRepository(sinon.spy() as unknown as State)
  const userService = new UserService(userRepository)

  it('Should remove a non-active user', async () => {
    const returnArray: User[] = []
    const getActiveStub = sinon.stub(userRepository, 'getActiveUser').returns(existingUser)
    const deleteByIdStub = sinon.stub(userRepository, 'deleteById').resolves(returnArray)
    const clearActiveStub = sinon.spy(userRepository, 'clearActiveUser')
    const userToDelete = new User(userData)

    const result = await userService.removeUser(userToDelete.id)

    expect(result).to.equal(returnArray)
    expect(getActiveStub.called).to.equal(true)
    expect(clearActiveStub.called).to.equal(false)
    expect(deleteByIdStub.called).to.equal(true)
    expect(deleteByIdStub.args[0][0]).to.equal(userToDelete.id)
    deleteByIdStub.restore()
    clearActiveStub.restore()
    getActiveStub.restore()
  })

  it('Should remove an active user', async () => {
    const returnArray: User[] = []
    const userToDelete = new User(userData)
    const getActiveStub = sinon.stub(userRepository, 'getActiveUser').returns(userToDelete)
    const deleteByIdStub = sinon.stub(userRepository, 'deleteById').resolves(returnArray)
    const clearActiveStub = sinon.stub(userRepository, 'clearActiveUser').resolves()

    const result = await userService.removeUser(userToDelete.id)

    expect(result).to.equal(returnArray)
    expect(getActiveStub.called).to.equal(true)
    expect(clearActiveStub.called).to.equal(true)
    expect(deleteByIdStub.called).to.equal(true)
    expect(deleteByIdStub.args[0][0]).to.equal(userToDelete.id)
    deleteByIdStub.restore()
    clearActiveStub.restore()
    getActiveStub.restore()
  })
})

describe('Updating users', () => {
  const userRepository = new UserRepository(sinon.spy() as unknown as State)
  const userService = new UserService(userRepository)

  it('Should update a non-active user', async () => {
    const findByIdStub = sinon.stub(userRepository, 'findById').returns(existingUser)
    const updateUserStub = sinon.stub(userRepository, 'updateUser').callsFake(async (user: User) => user)
    const getActiveStub = sinon.stub(userRepository, 'getActiveUser').returns(new User(userData))
    const selectUserStub = sinon.stub(userRepository, 'selectUser').resolves()

    const result = await userService.updateUser(existingUser.id, {
      email: 'update@test.com',
      name: existingUser.name,
      zipcode: existingUser.zipcode
    })

    expect(findByIdStub.called).to.equal(true)
    expect(updateUserStub.called).to.equal(true)
    expect(updateUserStub.args[0][0]).to.be.instanceOf(User)
    expect(updateUserStub.args[0][0].email).to.equal(result.email)
    expect(updateUserStub.args[0][0].id).to.equal(result.id)
    expect(getActiveStub.called).to.equal(true)
    expect(selectUserStub.called).to.equal(false)
    expect(result).to.be.instanceOf(User)
    expect(result.id).to.equal(existingUser.id)
    expect(result.email).to.not.equal(existingUser.email)
    findByIdStub.restore()
    updateUserStub.restore()
    getActiveStub.restore()
    selectUserStub.restore()
  })

  it('Should update an active user', async () => {
    const findByIdStub = sinon.stub(userRepository, 'findById').returns(existingUser)
    const updateUserStub = sinon.stub(userRepository, 'updateUser').callsFake(async (user: User) => user)
    const getActiveStub = sinon.stub(userRepository, 'getActiveUser').returns(existingUser)
    const selectUserStub = sinon.stub(userRepository, 'selectUser').resolves()

    const result = await userService.updateUser(existingUser.id, {
      email: 'update@test.com',
      name: existingUser.name,
      zipcode: existingUser.zipcode
    })

    expect(findByIdStub.called).to.equal(true)
    expect(updateUserStub.called).to.equal(true)
    expect(updateUserStub.args[0][0]).to.be.instanceOf(User)
    expect(updateUserStub.args[0][0].email).to.equal(result.email)
    expect(updateUserStub.args[0][0].id).to.equal(result.id)
    expect(getActiveStub.called).to.equal(true)
    expect(selectUserStub.called).to.equal(true)
    expect(result).to.be.instanceOf(User)
    expect(result.id).to.equal(existingUser.id)
    expect(result.email).to.not.equal(existingUser.email)
    findByIdStub.restore()
    updateUserStub.restore()
    getActiveStub.restore()
    selectUserStub.restore()
  })
})
