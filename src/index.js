//@flow

import requestUserinfo from './request-userinfo'
import type { Context } from 'koa'

const debug = require('debug')('koa-userinfo')

type Options = {
  site: string,
  allowMissingOrInvalidToken?: boolean
}

const getAccessTokenFromHeader = ctx => {
  const auth = ctx.headers.authorization
  if (!auth) {
    debug('No "Authorization" header found, headers:', ctx.headers)
    return undefined
  }
  const match = auth.match(/^Bearer (.+)$/)
  if (!match) {
    debug('Authorization header does not match "Bearer" token format')
    return undefined
  }
  return match[1]
}

export default (options: Options) => {

  if (!options.site) {
    throw new Error('option "site" missing')
  }

  return async (ctx: Context, next: () => Promise<void>) => {

    const token = getAccessTokenFromHeader(ctx)

    if (!token) {
      if (options.allowMissingOrInvalidToken) {
        return await next()
      } else {
        return ctx.throw(401, 'Unable to use or extract Bearer token')
      }
    } else {
      try {
        ctx.userinfo = await requestUserinfo(options.site, token)
        debug('userinfo', ctx.userinfo)
        await next()
      } catch (err) {
        return ctx.throw(401, err)
      }
    }

  }

}
