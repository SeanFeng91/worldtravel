<template>
    <div>
      <table class="editable-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="header in headers" :key="header">
              <input 
                type="text" 
                v-model="row[header]"
                @change="updateData"
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="button-group">
        <button @click="addRow">添加行</button>
        <button @click="saveData">保存数据</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // 定义 props
  const props = defineProps({
    pageId: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      default: () => ['时间', '地点', '活动', '费用', '备注']
    }
  })
  
  const API_BASE = import.meta.env.VITE_WORKER_URL.replace(/\/$/, '')
  const tableData = ref([
    { 时间: '', 地点: '', 活动: '', 费用: '', 备注: '' }
  ])
  
  const addRow = () => {
    tableData.value.push({ 时间: '', 地点: '', 活动: '', 费用: '', 备注: '' })
  }
  
  const updateData = () => {
    // 这里可以添加数据保存逻辑
    console.log(tableData.value)
  }
  
  // 加载数据
  const loadData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/travel-data?pageId=${props.pageId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        tableData.value = data.rows || []
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }
  
  // 保存数据
  const saveData = async () => {
    try {
      // 解构并创建普通对象，避免 Proxy 序列化问题
      const requestData = {
        pageId: props.pageId,
        rows: tableData.value.map(row => ({...row}))  // 将 Proxy 转换为普通对象
      }
      
      console.log('发送的数据:', JSON.stringify(requestData))  // 打印实际发送的 JSON 字符串

      const response = await fetch(`${API_BASE}/api/travel-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      // 打印响应状态
      console.log('Response status:', response.status)

      if (!response.ok) {
        // 尝试读取错误信息
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.error || '保存失败')
      }

      const data = await response.json()
      console.log('Save response:', data)
      alert('保存成功！')
    } catch (error) {
      console.error('保存失败:', error)
      alert(`保存失败: ${error.message}`)
    }
  }
  
  onMounted(() => {
    loadData()
  })
  </script>
  
  <style scoped>
  .editable-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }
  
  .editable-table th,
  .editable-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .editable-table input {
    width: 100%;
    border: none;
    padding: 4px;
    background: transparent;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>