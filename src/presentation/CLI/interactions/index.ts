import { addUser } from './user/addUser'
import { editUser } from './user/editUser'
import { listUsers } from './user/listUsers'
import { removeUser } from './user/removeUser'
import { chooseUser } from './user/chooseUser'
import { listProjects } from './projects/listProjects'
import { changePlacesKey } from './config/changePlacesKey'
import { changeDonorsKey } from './config/changeDonorsKey'
import { changeDonorsBaseURL } from './config/changeDonorsBaseURL'
import { changePlacesBaseURL } from './config/changePlacesBaseURL'

const interactions = {
  user: {
    addUser,
    removeUser,
    editUser,
    chooseUser,
    listUsers
  },
  projects: {
    listProjects
  },
  config: {
    changeDonorsBaseURL,
    changeDonorsKey,
    changePlacesBaseURL,
    changePlacesKey
  }
}

export default interactions