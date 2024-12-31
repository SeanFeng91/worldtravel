# WorldTravel 博客日志

## 2024-12-30

- 添加了博客内容加密浏览功能，使用以下组件就可以对博客内容进行加密浏览。目前需要手动在.env.local和环境变量中添加密码，后续会添加密码管理功能。

```vue
<PasswordProtected pageId="PageID">

# 加密内容

这里是需要密码才能查看的内容...

</PasswordProtected>
```
<PasswordProtected pageId="PageID">

# 加密内容

这里是需要密码才能查看的内容...

</PasswordProtected>

