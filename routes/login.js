const router = require('koa-router')()

const { successModel, errorModel } = require('../model/resModel')
const { login } = require('../controller/login') 

router.prefix('/login')

router.post('/', async function (ctx, next) {
  const { username, password } = ctx.request.body

  try {
    const data = await login(username, password)

    if (data.username) {
      ctx.session.username = data.username
      ctx.session.realname = data.realname
      ctx.body = successModel(data)
    } else {
      ctx.body = errorModel('登录失败')
    }
  } catch (error) {
    ctx.body = errorModel('出错')
  }
})

router.get('/test', async (ctx, next) => {
  const { username } = ctx.session
  if (username) {
    ctx.body = successModel('已登录')
  } else {
    ctx.body = errorModel('未登录')
  }
})

module.exports = router
