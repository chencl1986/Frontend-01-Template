# 学习总结

## PhantomJS

1. PhantomJS的内容我觉得效果不大好，由于其支持的ECMAScript版本实在太老，并且在其内部无法进行`console.log`输出内容，导致调试即为困难。
2. 不知是否改为Puppeteer效果会更好一些，但Puppeteer的依赖似乎比较大，可以提前通知学员下载。

## 项目发布

1. 我认为老师的OAuth登录流程有个问题，就是只支持了一个用户登录。
2. 实际项目中可以在获取token之后，直接获取用户信息，判断是否正常用户，再将用户信息存入Session，即可支持多用户同时访问，Koa的示例代码如下：

```
import session from 'koa-session';

// 使用koa-session中间件
server.use(session(
  {
    maxAge: 30 * 60 * 1000, // 登录状态30分钟后失效
    rolling: true,
    renew: false,
  },
  app
))

// 用户认证
router.get('/auth', ctx => {
  fetch('/user', {})
    .then(response => {
      return response.json()
    })
    .then(result => {
      // 登录后可以通过session判断当前用户的登录状态
      ctx.session.userInfo = result
    })
})

// 用户进行发布
router.get('/publish', async ctx => {
  if (!ctx.session.userInfo) {
    await ctx.render(500) // 使用模板引擎，渲染一个500报错页面
  } else {
    // 进行发布
  }
})
```

由于实现起来会复杂很多，而且改动比较大，考虑到实际用处不大，这里就不进行代码上的优化了。
