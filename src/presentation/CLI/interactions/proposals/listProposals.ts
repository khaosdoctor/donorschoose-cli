import inquirer from 'inquirer'
import { addUser } from '../user/addUser'
import { chooseUser } from '../user/chooseUser'
import { Logger } from '../../../../utils/logger'
import { APIError } from '../../../../data/errors/APIError'
import { UserService } from '../../../../services/UserService'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'
import { PlacesService } from '../../../../services/PlacesService'

export async function listProposals (service: DonorsChooseService, userService: UserService, placesService: PlacesService, logger: Logger) {
  try {
    if (!userService.listUsers().length) {
      logger.warn('There are no users registered, let us register one...')
      await addUser(userService, logger)
    }

    if (!userService.getActiveUser()) {
      logger.warn('You must set an active user in order to fetch data from the API')
      await chooseUser(userService, logger)
    }

    const results = await service.getProposalsByZipcode()
    if (!results.metadata.totalProposals) return logger.info('No proposals found')

    const answer = await inquirer.prompt([{
      type: 'rawlist',
      message: 'Select a proposal to learn more about it',
      name: 'selectedProposal',
      choices: results.proposals.map(proposal => ({
        name: `${logger.chalk.italic(decodeURIComponent(proposal.title))} [${logger.chalk.yellow(proposal.teacherName)}] ${logger.chalk.underline.green(`(${proposal.percentFunded}% complete)`)} - ${logger.chalk.magenta(proposal.schoolName)}, ${proposal.city} - ${proposal.state}, ${proposal.zip}`,
        value: proposal.id
      }))
    }])

    const proposal = results.proposals.find((proposal) => proposal.id === answer.selectedProposal)
    return logger.message(proposal)
  } catch (error) {
    if (error instanceof APIError) return logger.error(error.message)
    return logger.error(`An unexpected error ocurred: ${error.message}`)
  }
}
