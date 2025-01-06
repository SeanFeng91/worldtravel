# WorldTravel 博客日志

## 2025-01-05
### KV的wrangler部署代码
- 之前根据官方文档，KV的wrangler部署代码如下：
```
kv_namespaces = [
{ binding = "TRAVEL_DATA", id = "a12b9591362449f693a97bxxxxxxxxxx" }
]
```
但是一直都无法正常部署，即使使用 wrangler deploy --keep-vars也未能保留原有通过网页端配置的kv库。
早上参考配置成功的D1和R2的写法，一下子成功了：
```
[[kv_namespaces]]
binding = "TRAVEL_DATA"
id = "a12b9591362449f693a97bxxxxxxxxxx"
```
### 表格组建
```vue
<EditableTable 
  pageId="trip-2025-01-xxxx" 
  tableId="schedule"
  :headers="['时间', '地点', '活动', '费用', '备注']"
  :columnConfig="{
    '时间': { 
      type: 'datetime',
      placeholder: '请选择时间'
    },
    '地点': { 
      type: 'text',
      placeholder: '请输入地点'
    },
    '活动': { 
      type: 'text',
      placeholder: '请输入活动内容'
    },
    '费用': { 
      type: 'number',
      min: 0,
      decimals: 2,
      placeholder: '请输入费用'
    },
    '备注': { 
      type: 'text',
      placeholder: '可选'
    }
  }"
/>
```
- 考虑了日期、数字的输入
- 考虑列宽调整
- 考虑表格的编辑和保存，需要密码才可以编辑


## 2025-01-03
为了方便编辑表格，我尝试设计了一个表格组件，在需要的日志可以插入。同时尝试使用Cloudflare的KV来存储数据，目前可以正常保存和读取。但是在toml部署的时候，无法正确的binding。所以每次需要手动在页面端设置。

## 2025-01-01
探索性的功能已经有了一个基本的眉目，通过Gemini-2.0实现了大语音模型与地图、视频、搜索等功能的智能结合。虽然还只是一个非常粗浅的雏形。

下一个阶段我想先把已有的功能做一个规划，同时结合曾经旅行经历以及未来出行计划的撰写，来丰富博客内容。并且看一下实际应用过程中有哪些问题和结合点。

尝试记录2025年1月1日的有趣的一天。并且优化博客的导航。

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

