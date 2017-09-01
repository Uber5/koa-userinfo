//@flow

type Options = {
  site: string,
  allowMissingOrInvalidToken?: boolean
}

export default (options: Options) => {

  if (!options.site) {
    throw new Error('option "site" missing')
  }

  return async (ctx, next) => {
    console.log('do stuff...')
    await next()
  }

}
