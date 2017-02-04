import {
  formSunlightRequest,
  genElectionName,
  isUpForElection
} from './utils'

describe('utils', () => {
  describe('genElectionName', () => {
    describe('general elections', () => {
      it('should generate a proper election name for a midterm year', () => {
        const expected = '2018 general election (midterm)'
        const result = genElectionName(2018)

        expect(result).toEqual(expected)
      })

      it('should generate a proper election name for an election year', () => {
        const expected = '2020 general election'
        const result = genElectionName(2020)

        expect(result).toEqual(expected)
      })
    })
  })

  describe('isUpForElection', () => {
    it('should return reps up for election based on term end', () => {
      const expected = [{
        name: 'Jim',
        term_end: '2040-1-09'
      }]

      const result = isUpForElection(expected.concat({ name: 'Not Jim', term_end: '2038-1-09' }), 2039)

      expect(result).toEqual(expected)
      expect(result.length).toEqual(1)
      expect(result[0].name).toEqual('Jim')
    })

    it('should return an empty array if no reps are up for re-election', () => {
      const result = isUpForElection([{ name: 'Not Jim', term_end: '2038-1-09' }], 2057)
      expect(result.length).toEqual(0)
    })
  })

  describe('formSunlightRequest', () => {
    it('should form a proper request url given a zipcode', () => {
      const expected = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=94102'
      const result = formSunlightRequest(94102)

      expect(result).toEqual(expected)
    })
  })
})
