import { RawProposalResponse } from '../../../../src/data/repositories/DonorsClient'

export const singleProposal: RawProposalResponse = {
  breadcrumb: [],
  index: '0',
  max: '10',
  totalProposals: '1',
  searchURL: '',
  searchTerms: '',
  proposals: [{
    id: '123456',
    proposalURL: 'http://proposalurl.mock',
    fundURL: '',
    imageURL: '',
    retinaImageURL: '',
    thumbImageURL: '',
    title: 'My test proposal',
    shortDescription: 'My short description',
    fulfillmentTrailer: 'My fulfillment trailer',
    percentFunded: '25',
    numDonors: '10',
    costToComplete: '122.24',
    studentLed: false,
    numStudents: '123',
    professionalDevelopment: true,
    matchingFund: {
      amount: 0,
      matchingKey: '',
      ownerRegion: '',
      name: '',
      donorSalutation: '',
      type: '',
      matchImpactMultiple: '',
      multipleForDisplay: '',
      description: '',
      logoURL: ''
    },
    totalPrice: '200.32',
    freeShipping: 'true',
    teacherId: '109',
    teacherName: 'Test Teacher',
    gradeLevel: {
      id: '1',
      name: 'test grade'
    },
    povertyLevel: 'Test poverty level',
    povertyType: {
      label: '',
      name: '',
      range: '',
      showPovertyLevel: 'false'
    },
    schoolTypes: [],
    schoolName: 'Test school',
    schoolUrl: 'http://school.mock',
    city: 'Seattle',
    zip: '11202',
    state: 'WA',
    stateFullName: 'Washington',
    latitude: '11.23444',
    longitude: '-34.2223',
    zone: {
      id: '123',
      name: ''
    },
    subject: {
      groupId: '1',
      id: '',
      name: ''
    },
    additionalSubjects: [],
    resource: {
      id: '',
      name: ''
    },
    expirationDate: '2020-02-02',
    expirationTime: 12221029,
    fundingStatus: 'need funding'
  }]
}
