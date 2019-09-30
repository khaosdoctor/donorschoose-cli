import ora from 'ora'
import inquirer from 'inquirer'
import { addUser } from '../user/addUser'
import { chooseUser } from '../user/chooseUser'
import { Logger } from '../../../../utils/logger'
import { APIError } from '../../../../data/errors/APIError'
import { UserService } from '../../../../services/UserService'
import { GoogleService } from '../../../../services/GoogleService'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'

export async function listProposals (donorsChooseService: DonorsChooseService, userService: UserService, placesService: GoogleService, logger: Logger) {
  const spinner = ora()
  try {
    if (!userService.listUsers().length) {
      logger.warn('There are no users registered, let us register one...')
      await addUser(userService, logger)
    }

    if (!userService.getActiveUser()) {
      logger.warn('You must set an active user in order to fetch data from the API')
      await chooseUser(userService, logger)
    }

    spinner.start('Loading proposals...')
    const results = await donorsChooseService.getProposalsByZipcode()
    if (!results.metadata.totalProposals) return logger.info('No proposals found')
    spinner.stop()

    const answer = await inquirer.prompt([{
      type: 'rawlist',
      message: 'Select a proposal to learn more about it',
      name: 'selectedProposal',
      choices: results.proposals.map(proposal => ({
        name: proposal.getColorizedHeader(logger.chalk),
        value: proposal.id
      }))
    }])

    spinner.start('Loading proposal map...')

    const proposal = results.proposals.find((proposal) => proposal.id === answer.selectedProposal)!
    const map = await placesService.getMap(proposal.latitude, proposal.longitude, proposal.schoolName)
    proposal.locationMapUrl = map

    spinner.stop()
    return logger.message(proposal.toColorizedString(logger.chalk))
  } catch (error) {
    if (error instanceof APIError) return spinner.fail(error.message)
    return spinner.fail(`An unexpected error ocurred: ${error.message}`)
  }
}
