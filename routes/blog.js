const router = require('koa-router')()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { successModel, errorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/blog')

// 查询博客文章列表
router.get('/list', async function(ctx, next) {
  const author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  try {
    const listData = await getList(author, keyword)
    ctx.body = successModel(listData)
  } catch (error) {
    ctx.body = errorModel('查询列表失败')
  }
})

// 获取博客详情
router.get('/:blogId', async (ctx, next) => {
  const { blogId } = ctx.params

  try {
    const detailData = await getDetail(blogId)
    ctx.body = successModel(detailData)
  } catch (error) {
    ctx.body = errorModel('查询博客详情失败')
  }
})

// 新建博客
router.post('/', loginCheck, async (ctx, next) => {
  const data = {
    ...ctx.request.body,
    author: ctx.session.username
  }

  try {
    const blogData = await newBlog(data)
    ctx.body = successModel(blogData)
  } catch (error) {
    ctx.body = errorModel('创建博客失败')
  }
})

router.put('/:blogId', loginCheck, async(ctx, next) => {
  const { blogId } = ctx.params

  try {
    const data = await updateBlog(blogId, ctx.request.body)
    ctx.body = successModel(data)
  } catch (error) {
    ctx.body = errorModel('更新博客失败')
  }
})

// 删除博客
router.delete('/:blogId', loginCheck, async (ctx, next) => {
  const { blogId } = ctx.params
  const author = ctx.session.username
  
  try {
    const result = await delBlog(blogId, author)
    if (result) {
      ctx.body = successModel('删除博客成功')
    } else {
      ctx.body = errorModel('删除博客失败')
    }
  } catch (error) {
    ctx.json(errorModel('删除博客失败'))
  }
})

module.exports = router
