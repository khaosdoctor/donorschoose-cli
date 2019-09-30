import { Proposal } from '../domain/Proposal'
import he from 'he'

export function decodeProposalString (proposal: Proposal) {
  const clonedProposal = Object.assign({}, proposal)
  clonedProposal.title = he.decode(clonedProposal.title)
  clonedProposal.city = he.decode(clonedProposal.city)
  clonedProposal.teacherName = he.decode(clonedProposal.teacherName)
  clonedProposal.shortDescription = he.decode(clonedProposal.shortDescription)
  clonedProposal.fulfillmentTrailer = he.decode(clonedProposal.fulfillmentTrailer)
  clonedProposal.matchingFund.description = he.decode(clonedProposal.matchingFund.description)

  return clonedProposal
}
