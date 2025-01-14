# Google 旅游搜索工具

这个页面提供了专门针对旅游信息的 Google 搜索功能。你可以搜索景点、美食、住宿等旅游相关信息。

<GoogleSearchElement />

## 使用提示

1. 在搜索框中输入你想要查找的旅游信息
2. 可以使用以下关键词组合来优化搜索结果：
   - 添加"景点"、"美食"、"住宿"等关键词
   - 添加具体的地点名称
   - 添加"攻略"、"推荐"等词语

## 搜索示例

- "东京必去景点推荐"
- "巴黎米其林餐厅"
- "普吉岛度假酒店"
- "纽约自由行攻略"

## Gemini-2.0-flash联动地图
使用 Google Maps 与Gemini联动，展示Agent能力。
- 实现了于Gemini的连续对话
- 可以结合对话的内容在地图上绘制相应的地点

:::tip
比如你可以这样问：
- 你知道中国历史上有哪些古都吗？
- 你可以帮我在地图上标记出这些古都吗？
- 帮我规划一下这些古都的旅游线路。
:::

但是现在通过websocket调用Gemini，可能是使用的人多，或者说网络的原因，会出现Websocket关闭的情况。或者它对每分钟提问的次数有现在，过于快的提问有时候会出现无法响应的情况。

<GeminiMap />


## Gemini AI 智能搜索

使用 Gemini AI 来获取更智能的旅游建议和个性化推荐。

<!-- <GeminiSearchElement /> -->

## Gemini AI 实时对话
使用 Gemini AI 进行实时语音和视频对话。
<!-- <GeminiLiveChat /> -->


---
