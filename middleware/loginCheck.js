const { errorModel } = require('../model/resModel')

async function loginCheck (ctx, next) {
  if (ctx.session.username) {
    await next()
  } else {
    ctx.body = errorModel('未登录')
  }
}

module.exports = loginCheck
