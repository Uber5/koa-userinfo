import Koa from 'koa'
import userinfo from '../src'

const app = new Koa()

app.use(
  userinfo({ site: 'https://login-test.u5auth.com/userinfo' })
)

app.use(
  async ctx => {
    ctx.body = `userinfo=${ JSON.stringify(ctx.userinfo) }`
  }
)

app.listen(process.env.PORT || 3000)