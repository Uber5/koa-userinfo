//@flow

import { get } from 'http'
import { get as gets } from 'https'
import { parse } from 'url'

const debug = require('debug')('koa-userinfo')

export default async (url: string, token: string) => {

  const { hostname, port, protocol, path } = parse(url)
  
  const _get = protocol === 'https:' ? gets : get

  return new Promise((resolve, reject) => {

    debug('requesting userinfo', { hostname, port, protocol, path, token })

    const req = _get({
      hostname,
      port,
      protocol,
      path,
      headers: {
        authorization: `Bearer ${ token }`
      }
    }, res => {
      debug('userinfo response.statusCode', res.statusCode)
      let data = ''
      res.on('data', _data => data += _data)
      res.on('end', () => {
        debug('userinfo received', data)
        if (res.statusCode !== 200) {
          return reject(new Error(`userinfo not available, statusCode=${ res.statusCode }, data=${ data }`))
        }
        resolve(JSON.parse(data))
      })
    })
    req.on('error', err => reject(err))
    
  })

}