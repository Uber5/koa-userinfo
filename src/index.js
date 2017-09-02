//@flow

import requestUserinfo from './request-userinfo'

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

    if (!token) {
      if (options.allowMissingOrInvalidToken) {
        return await next()
      } else {
        return ctx.throw(401, 'Unable to use / extract Bearer token')
      }
    } else {
      ctx.userinfo = await requestUserinfo(options.site)
      await next()
    }

  }

}
