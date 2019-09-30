import he from 'he'
import { Chalk } from 'chalk'
import { PovertyType, MatchingFund, GroupPropertyDescriptor, RawProposal, PropertyDescriptor } from './RawProposal'

export class Proposal {
  id: string = ''
  proposalURL: string = ''
  fundURL: string = ''
  imageURL: string = ''
  retinaImageURL: string = ''
  thumbImageURL: string = ''
  title: string = ''
  shortDescription: string = ''
  fulfillmentTrailer: string = ''
  percentFunded: number = 0
  numDonors: number = 0
  costToComplete: number = 0
  studentLed: boolean = false
  numStudents: number = 0
  professionalDevelopment: boolean = false
  matchingFund: MatchingFund | null = null
  totalPrice: number = 0
  freeShipping: boolean = true
  teacherId: string = ''
  teacherName: string = ''
  gradeLevel: PropertyDescriptor | null = null
  povertyLevel: string = ''
  povertyType: PovertyType | null = null
  schoolTypes: PropertyDescriptor[] = []
  schoolName: string = ''
  schoolUrl: string = ''
  city: string = ''
  zip: string = ''
  state: string = ''
  stateFullName: string = ''
  latitude: string = ''
  longitude: string = ''
  zone: PropertyDescriptor | null = null
  subject: GroupPropertyDescriptor | null = null
  additionalSubjects: GroupPropertyDescriptor[] = []
  resource: PropertyDescriptor | null = null
  expirationDate: Date = new Date()
  expirationTime: number = 0
  fundingStatus: string = ''
  locationMapUrl: string = ''

  static create (data: RawProposal & { locationMapUrl?: string }): Proposal {
    const proposal = new Proposal()
    proposal.id = data.id
    proposal.proposalURL = data.proposalURL
    proposal.fundURL = data.fundURL
    proposal.imageURL = data.imageURL
    proposal.retinaImageURL = data.retinaImageURL
    proposal.thumbImageURL = data.thumbImageURL
    proposal.title = he.decode(data.title)
    proposal.shortDescription = he.decode(data.shortDescription)
    proposal.fulfillmentTrailer = he.decode(data.fulfillmentTrailer)
    proposal.percentFunded = parseInt(data.percentFunded, 10)
    proposal.numDonors = parseInt(data.numDonors, 10)
    proposal.costToComplete = parseFloat(data.costToComplete)
    proposal.studentLed = data.studentLed
    proposal.numStudents = parseInt(data.numStudents, 10)
    proposal.professionalDevelopment = data.professionalDevelopment
    proposal.matchingFund = data.matchingFund
    proposal.matchingFund.description = he.decode(data.matchingFund.description)
    proposal.totalPrice = parseFloat(data.totalPrice)
    proposal.freeShipping = data.freeShipping === 'true' ? true : false
    proposal.teacherId = data.teacherId
    proposal.teacherName = he.decode(data.teacherName)
    proposal.gradeLevel = data.gradeLevel
    proposal.povertyLevel = data.povertyLevel
    proposal.povertyType = data.povertyType
    proposal.schoolTypes = data.schoolTypes
    proposal.schoolName = he.decode(data.schoolName)
    proposal.schoolUrl = data.schoolUrl
    proposal.city = he.decode(data.city)
    proposal.zip = data.zip
    proposal.state = data.state
    proposal.stateFullName = he.decode(data.stateFullName)
    proposal.latitude = data.latitude
    proposal.longitude = data.longitude
    proposal.zone = data.zone
    proposal.subject = data.subject
    proposal.subject.name = he.decode(data.subject.name)
    proposal.additionalSubjects = data.additionalSubjects ? data.additionalSubjects.map(subject => ({ ...subject, name: he.decode(subject.name) })) : []
    proposal.resource = data.resource
    proposal.expirationDate = new Date(data.expirationDate)
    proposal.expirationTime = data.expirationTime
    proposal.fundingStatus = data.fundingStatus
    proposal.locationMapUrl = data.locationMapUrl ? data.locationMapUrl : ''

    return proposal
  }

  getColorizedHeader (chalk: Chalk) {
    return `${chalk.italic(decodeURIComponent(this.title))} [${chalk.yellow(this.teacherName)}] ${chalk.underline.green(`(${this.percentFunded}% complete)`)} - ${chalk.magenta(this.schoolName)}, ${this.city} - ${this.state}, ${this.zip}`
  }

  get schoolFullAddress () {
    return `${this.city} - ${this.state}, ${this.zip}`
  }

  toColorizedString (chalk: Chalk) {
    return `
      ${chalk.bold('Proposal:')} ${chalk.bold.cyan(this.title)} [${chalk.bold.magenta(this.fundingStatus)}]
      By ${chalk.italic.bold.yellow(this.teacherName)} of ${chalk.bold.italic.blueBright(this.schoolName)} at ${chalk.italic.bold.magenta(this.schoolFullAddress)}
      ${chalk.italic.green(this.percentFunded.toString() + '%')} complete (${chalk.italic.green(`$${this.totalPrice - this.costToComplete}`)} of ${chalk.red(`$${this.totalPrice}`)})
      ${chalk.bold.cyan(this.numDonors.toString())} donors helping ${chalk.bold.cyan(this.numStudents.toString())} students

      -----------------

      ${chalk.bold('Trailer')}
      "${chalk.italic.cyan(this.fulfillmentTrailer)}"

      ${chalk.bold('Short Description:')}
      ${chalk.italic(this.shortDescription)}

      -----------------

      ${chalk.bold('This proposal expires at:')} ${chalk.bold.yellow(this.expirationDate.toLocaleDateString())}
      ${chalk.bold('Learn more at:')} ${chalk.underline.cyan(this.proposalURL)}
      ${chalk.bold('Check the map to the school:')} ${chalk.underline.cyan(this.locationMapUrl)}
    `
  }
}
