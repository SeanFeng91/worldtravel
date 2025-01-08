# WorldTravel 博客日志

## 2025-01-08
尝试了很多次在gemini-2.0的输入部分添加图片和附件都以api调取失败告终。但是通过colab测试发现2.0模型是支持这样的功能的。而且官网也可以做到，多模态输入+tools。只是可能我目前还没办法正确调用。而且因为后端的配置模式通过workers也比较复杂。有机会重新学习下再组合。

近期有个非常“紧急”的出行任务，去阿勒泰。需要快速的准备一下。


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
  pageId="trip-2025-01-yuandan" 
  tableId="schedule"
  :headers="['时间', '地点', '活动', '图片', '费用', '备注']"
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
    '图片': {  // 添加图片列配置
      type: 'image',
      placeholder: '点击上传图片'
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
- 考虑了图片列的编辑和保存
- 考虑了其他文件附件的上传，但是现在这个附件是依赖于表格的。

## 具体功能函数总结
::: details
### 核心功能实现

**1. 表格基础功能**
- 动态渲染表格数据 (`tableData.value` 响应式数据)
- 通过 `addRow()` 和 `removeRow(rowIndex)` 实现行的增删
- 使用 `v-model` 实现单元格实时编辑
- 通过 `handleUnlock()` 实现密码保护的编辑功能

**2. 文件管理功能**
- `handleFileChange()` 处理多种类型文件上传
- `previewFile(file)` 根据文件类型智能处理预览/下载
- `deleteFile(file)` 实现文件删除
- `handleCellImageChange()` 处理图片类型单元格的特殊上传

**3. 数据持久化**
- `handleTableContent()` 管理 KV 中的表格数据
- `handleFileUpload()` 处理 R2 中的文件存储
- `loadData()` 实现数据自动同步和更新

### 技术特点

**1. 数据处理**
- `unusedAttachments` 计算属性过滤重复文件
- `formatDisplayValue()` 处理不同类型数据的显示格式
- `getColumnTotal()` 实现数值列的自动合计

**2. 文件处理**
- `isImageFile()` 判断文件类型
- `formatFileSize()` 格式化文件大小显示
- `getFileIcon()` 根据文件类型显示对应图标

**3. 安全性**
- 文件上传前的类型和大小验证
- 密码保护的编辑权限控制
- CORS 安全配置

### 存储设计

**1. KV 存储**
- 使用 `${pageId}:${tableId}` 作为唯一键
- 存储表格数据和文件元数据
- 支持数据版本控制

**2. R2 存储**
- 使用 `${pageId}/${tableId}/${timestamp}_${filename}` 的文件路径结构
- 支持文件的 MIME 类型存储
- 实现文件的 CDN 分发

### 用户体验

**1. 交互设计**
- 实时编辑和自动保存
- 文件拖拽上传支持
- 图片预览和文件下载

**2. 界面优化**
- 响应式布局适配
- 暗色主题支持
- 加载状态提示

**3. 错误处理**
- 文件上传失败重试
- 数据保存错误提示
- 网络异常处理

这个组件通过结合 Cloudflare KV 和 R2 服务，实现了一个企业级的可编辑表格系统，特别适合需要文件管理的场景。

:::


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

