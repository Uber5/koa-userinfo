//@flow

type Options = {
  site: string,
  allowMissingOrInvalidToken?: boolean
}

const getAccessTokenFromHeader = ctx => {
  const auth = ctx.headers.authorization
  if (!auth) {
    return undefined
  }
  const match = auth.match(/^Bearer (.+)$/)
  return match && match[1]
}



export default (options: Options) => {

  if (!options.site) {
    throw new Error('option "site" missing')
  }

  return async (ctx, next) => {

    const token = getAccessTokenFromHeader(ctx)
    if (!token && !options.allowMissingOrInvalidToken) {
      return ctx.throw(401, 'Unable to use / extract Bearer token')
    }
    
    console.log('do stuff...')
    await next()
  }

}
