# What?

This is [koa](https://github.com/koajs/koa) middleware to retrieve information about an authenticated user (the `userinfo`) given their access token.

See the [relevant part of the OpenID specification](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo) for details on `userinfo`.

# How to Use

In a `koa` app, add as middleware:

```
app.use(userinfo({ site: 'https://login-test.u5auth.com/userinfo' }))
```

The middleware fails with a status of 401 if no token is available. This can be ignored by setting the option `allowMissingOrInvalidToken: true`.

# How to Run Sample

Check the `site` [in the sample](./sample/index.js) and adjust to your userinfo provider (your OAuth2 / OpenID provider). Then:

```
npm install
npm run sample
```

This runs a sample server (on port `PORT` or 3000), which responds with a text representation of your userinfo, if you call it with a valid access token.

Example call:

```
export TOKEN=123
curl -v -H "Authorization: Bearer $TOKEN" localhost:3000
```
