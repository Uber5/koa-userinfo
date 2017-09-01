import koaUserinfo from '../'

describe('the middleware', () => {
  describe('creating it', () => {
    it('fails without site', () => {
      expect(() => koaUserinfo({})).toThrow()
    })
  })
})
