import uuid from 'uuid/v4'
export interface CreateUserData {
  id?: string
  name: string
  email: string
  zipcode: string
}

export class User {
  id: string = uuid()
  name: string = ''
  email: string = ''
  zipcode: string = ''

  constructor ({ id, name, email, zipcode }: CreateUserData) {
    if (id) this.id = id
    this.name = name
    this.email = email
    this.zipcode = zipcode
  }

  serialize () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      zipcode: this.zipcode
    }
  }
}
