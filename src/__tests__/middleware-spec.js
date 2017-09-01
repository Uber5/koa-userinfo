import koaUserinfo from '../'

const newCtx = () => ({
  headers: {},
  throw: jest.fn()
})

describe('the middleware', () => {

  describe('creating it', () => {
    it('fails without site', () => {
      expect(() => koaUserinfo({})).toThrow()
    })
  })

  describe('using it', () => {

    it('throws without or invalid authorization header', () => {

      const middleware = koaUserinfo({ site: '123' })
      const ctx = newCtx()
      // expect(() => middleware(ctx)).toThrow()
      middleware(ctx)
      expect(ctx.throw.mock.calls.length).toBe(1)

    })

    it('does not throw if throwing disabled', async () => {
      
      const middleware = koaUserinfo({
        site: '123',
        allowMissingOrInvalidToken: true
      })
      const ctx = newCtx()
      
      return await new Promise((resolve, reject) => {
        middleware(ctx, () => resolve())
      })

    })
  })

})
