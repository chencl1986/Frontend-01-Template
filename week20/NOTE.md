# 学习总结

## PhantomJS

1. PhantomJS 的内容我觉得效果不大好，由于其支持的 ECMAScript 版本实在太老，并且在其内部无法进行`console.log`输出内容，导致调试即为困难。
2. 不知是否改为 Puppeteer 效果会更好一些，但 Puppeteer 的依赖似乎比较大，可以提前通知学员下载。

## 项目发布

我认为老师的 OAuth 登录流程有个问题，就是只支持了一个用户登录。

我针对这个问题，做了一些改动：

1. 启动`publish-new/publish-vanilla/index.js`时，打开页面`http://localhost:8081/index.html`。
2. 此时从 cookie 中读取 token，如果存在则可以进行发布，不存在则跳转到 GitHub 登录。
3. 访问`http://localhost:8081/auth`时，同样判断 token 存在与否，决定是否要登录。
4. 设置了 `Cookie` 有效期为 30 分钟。

测试方式：

1. 启动`publish-new/publish-vanilla/index.js`，会自动打开`http://localhost:8081/index.html`进行登录。
2. 在另一浏览器打开页面`http://localhost:8081/index.html`进行登录。
3. 启动`publish-new/publish-tool/publish.js`。
4. 分别点击两个浏览器在哪个的`Publish`按钮，都可以进行发布。
