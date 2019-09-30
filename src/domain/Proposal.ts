export interface Proposal {
  id: number
  proposalURL: string
  fundURL: string
  imageURL: string
  retinaImageURL: string
  thumbImageURL: string
  title: string
  shortDescription: string
  fulfillmentTrailer: string
  percentFunded: string
  numDonors: string
  costToComplete: string
  studentLed: boolean
  numStudents: string
  professionalDevelopment: boolean
  matchingFund: MatchingFund
  totalPrice: string
  freeShipping: string
  teacherId: string
  teacherName: string
  gradeLevel: PropertyDescriptor
  povertyLevel: string
  povertyType: PovertyType
  schoolTypes: PropertyDescriptor[]
  schoolName: string
  schoolUrl: string
  city: string
  zip: string
  state: string
  stateFullName: string
  latitude: string
  longitude: string
  zone: PropertyDescriptor
  subject: GroupPropertyDescriptor
  additionalSubjects: GroupPropertyDescriptor[]
  resource: PropertyDescriptor
  expirationDate: string
  expirationTime: number
  fundingStatus: string
}

interface PropertyDescriptor {
  id: string
  name: string
}

interface GroupPropertyDescriptor extends PropertyDescriptor {
  groupId: string
}

interface PovertyType {
  label: string
  name: string
  range: string
  showPovertyLevel: string
}

interface MatchingFund {
  matchingKey: string
  ownerRegion: string
  name: string
  donorSalutation: string
  type: string
  matchImpactMultiple: string
  multipleForDisplay: string
  logoURL: string
  amount: number
  description: string
}
