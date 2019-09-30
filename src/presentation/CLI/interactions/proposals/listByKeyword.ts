import ora from 'ora'
import inquirer from 'inquirer'
import { userOnboarding } from './userOnboarding'
import { Logger } from '../../../../utils/logger'
import { APIError } from '../../../../data/errors/APIError'
import { UserService } from '../../../../services/UserService'
import { GoogleService } from '../../../../services/GoogleService'
import { DonorsChooseService } from '../../../../services/DonorsChooseService'

export async function listByKeyword (donorsChooseService: DonorsChooseService, userService: UserService, placesService: GoogleService, logger: Logger) {
  const spinner = ora()
  try {
    await userOnboarding(userService, logger)

    const keywordAnswer = await inquirer.prompt([{
      type: 'input',
      message: 'Type a keyword:',
      name: 'keyword'
    }])

    spinner.start('Loading proposals...')
    const results = await donorsChooseService.getProposalsByKeyword(keywordAnswer.keyword)
    spinner.stop()

    if (!results.metadata.totalProposals) return logger.info('No proposals found')

    const proposalSelection = await inquirer.prompt([{
      type: 'rawlist',
      message: 'Select a proposal to learn more about it',
      name: 'selectedProposal',
      choices: results.proposals.map(proposal => ({
        name: proposal.getColorizedHeader(logger.chalk),
        value: proposal.id
      }))
    }])

    spinner.start('Loading proposal map...')

    const proposal = results.proposals.find((proposal) => proposal.id === proposalSelection.selectedProposal)!
    const map = await placesService.getMap(proposal.latitude, proposal.longitude, proposal.schoolName)
    proposal.locationMapUrl = map

    spinner.stop()
    return logger.message(proposal.toColorizedString(logger.chalk))
  } catch (error) {
    if (error instanceof APIError) return spinner.fail(error.message)
    return spinner.fail(`An unexpected error ocurred: ${error.message}`)
  }
}
