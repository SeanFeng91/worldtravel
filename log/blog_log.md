# WorldTravel 博客日志

## 2024-12-31
- 解决了[GoogleSDK](../tools/GoogleSDK.md)中关于启用搜索的功能，目前处于资源限制，无法使用的情况。是因为我在对应的api做了api功能的限制，只能使用一个。
- 解决了Youtube搜索错误的问题，其实一直可以的，应该是我worker的Google_api_key的问题。通过只写写死api成功搜索后逐渐排除问题。

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

