//@flow
import { get } from 'http'
import { parse } from 'url'

export default async (url: string, token: string) => {

  const { hostname, port, path } = parse(url)
  return new Promise((resolve, reject) => {
    get({
      hostname,
      port,
      path,
      headers: {
        authorization: `Bearer ${ token }`
      }
    }, res => {
      let data = ''
      res.on('data', _data => data += _data)
      res.on('end', () => resolve(data))
    })
  })

}