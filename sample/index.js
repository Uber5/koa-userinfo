import Koa from 'koa'
import userinfo from '../src'

const app = new Koa()

app.use(ctx => {

  ctx.body = `<html>
    <body>
      <form>
        <input name="token" placeholder="enter token">
        <button type="submit">Submit</button>
      </form>
      <p>userinfo=${ JSON.stringify(ctx.userinfo) }</p>
    </body>
  </html>`
  
})

// app.post(ctx => {
//   ctx.body = 'posted'
// })

app.listen(process.env.PORT || 3000)