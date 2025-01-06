<script setup>
import EditableTable from '../components/EditableTable.vue'
</script>
# 2025元旦mini现代五项
非常充实的一天。约了GPY和CLH夫妇，本着**新年登高新气象**的出发点，我们规划一天的旅行。
# 元旦行程


<EditableTable 
  pageId="trip-2025-01-yuandan" 
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

```mermaid
flowchart LR
        A[家] -->|开车 30min| B[GPY家]
        B -->|开车 15min| C[王氏烧饼]
        C -->|步行 10min| D[爬山]
style A fill:#f9f,stroke:#333
style D fill:#ff9,stroke:#333

```
```mermaid
flowchart LR

        D1[黄龙洞] -->|30min| D2[初阳台]
        D2 -->|45min| D3[保俶塔]
        D3 -->|45min| D4[北山街]
        style D1 fill:#ff9,stroke:#333
        style D2 fill:#ff9,stroke:#333
        style D3 fill:#ff9,stroke:#333

```

```mermaid
flowchart LR
        D4[北山街] -->|骑车 15min| E[GPY家桌游]
        E -->|开车 20min| G[黄龙气膜馆打球]
        G -->|步行 10min| I[夏星酒馆]
        I -->|开车 40min| J[萧山家]
    style J fill:#bbf,stroke:#333
```






