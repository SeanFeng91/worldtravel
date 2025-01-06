<template>
  <div class="editable-table">
    <div class="table-container">
      <table>
        <colgroup>
          <col v-for="header in props.headers" :key="header" 
               :style="getColumnWidth(header)"
               :class="getColumnClass(header)">
          <col v-if="isEditable" class="action-col">
        </colgroup>
        <thead>
          <tr>
            <th v-for="header in props.headers" :key="header">
              {{ header }}
              <div v-if="columnTypes[header] === 'number'" class="column-total">
                合计: {{ formatNumber(getColumnTotal(header), header) }}
              </div>
            </th>
            <th v-if="isEditable"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="header in props.headers" :key="header" 
                :class="getColumnClass(header)">
              <!-- 根据编辑权限显示不同的内容 -->
              <template v-if="isEditable">
                <input
                  v-if="columnTypes[header] === 'number'"
                  type="text"
                  :value="row[header]"
                  @input="handleNumberInput($event, row, header)"
                  @blur="formatNumberOnBlur(row, header)"
                  :placeholder="getPlaceholder(header)"
                  class="input-field"
                >
                <input
                  v-else-if="columnTypes[header] === 'datetime'"
                  type="datetime-local"
                  v-model="row[header]"
                  :max="maxDate"
                  :min="minDate"
                  class="input-field"
                >
                <textarea
                  v-else
                  v-model="row[header]"
                  :placeholder="getPlaceholder(header)"
                  class="input-field textarea-field"
                  rows="1"
                  @input="autoGrow($event.target)"
                ></textarea>
              </template>
              <template v-else>
                <!-- 只读模式 -->
                <span class="readonly-text">{{ formatDisplayValue(row[header], header) }}</span>
              </template>
            </td>
            <td v-if="isEditable" class="action-column">
              <button @click="removeRow(index)" class="delete-btn" title="删除">×</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isEditable" class="table-actions">
      <button @click="addRow" class="add-btn">添加行</button>
      <button @click="saveData" class="save-btn">保存</button>
    </div>

    <!-- 未授权时显示解锁按钮 -->
    <div v-else class="unlock-container">
      <button @click="showUnlockDialog" class="unlock-btn">
        <i class="fas fa-lock"></i> 解锁表格编辑
      </button>
    </div>

    <!-- 解锁对话框 -->
    <div v-if="showUnlock" class="unlock-dialog">
      <div class="unlock-dialog-content">
        <h3>请输入密码解锁编辑</h3>
        <input 
          type="password" 
          v-model="password"
          class="password-input"
          @keyup.enter="handleUnlock"
          placeholder="请输入密码"
        >
        <div class="dialog-actions">
          <button @click="handleUnlock" class="confirm-btn">确认</button>
          <button @click="showUnlock = false" class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  pageId: String,
  tableId: String,
  headers: Array,
  columnConfig: {
    type: Object,
    default: () => ({})
  }
})

const API_BASE = import.meta.env.VITE_WORKER_URL
const tableData = ref([])
const attachments = ref([])
const selectedFile = ref(null)

// 定义列类型
const columnTypes = computed(() => {
  const types = {}
  props.headers.forEach(header => {
    types[header] = props.columnConfig[header]?.type || 'text'
  })
  return types
})

// 格式化数字
const formatNumber = (value, header) => {
  if (!value) return ''
  const config = props.columnConfig[header]
  const decimals = config?.decimals ?? 2
  const num = parseFloat(value)
  return isNaN(num) ? '' : num.toFixed(decimals)
}

// 处理数字输入 - 不再立即格式化
const handleNumberInput = (event, row, header) => {
  const value = event.target.value.replace(/[^\d.]/g, '')
  const parts = value.split('.')
  
  // 只允许一个小数点
  if (parts.length > 2) {
    parts.splice(2)
  }
  
  // 限制小数位数，但只在有小数点时处理
  if (parts[1]) {
    const config = props.columnConfig[header]
    const decimals = config?.decimals ?? 2
    parts[1] = parts[1].slice(0, decimals)
  }
  
  row[header] = parts.join('.')
}

// 失去焦点时格式化数字
const formatNumberOnBlur = (row, header) => {
  if (row[header]) {
    row[header] = formatNumber(row[header], header)
  }
}

// 确认日期时间
const confirmDateTime = (row, header) => {
  // 可以在这里添加额外的验证逻辑
  alert('日期时间已确认：' + row[header])
}

// 计算列合计
const getColumnTotal = (header) => {
  if (columnTypes.value[header] !== 'number') return null
  
  return tableData.value.reduce((sum, row) => {
    const value = parseFloat(row[header]) || 0
    return sum + value
  }, 0)
}

// 获取输入框提示
const getPlaceholder = (header) => {
  return props.columnConfig[header]?.placeholder || ''
}

// 自动调整文本框高度
const autoGrow = (element) => {
  element.style.height = 'auto'
  element.style.height = (element.scrollHeight) + 'px'
}

// 日期范围限制
const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1) // 允许未来一年
  return date.toISOString().slice(0, 16)
})

const minDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 5) // 允许过去五年
  return date.toISOString().slice(0, 16)
})

// 添加行
const addRow = () => {
  const newRow = {}
  props.headers.forEach(header => {
    newRow[header] = ''
  })
  tableData.value.push(newRow)
}

// 删除行
const removeRow = (index) => {
  tableData.value.splice(index, 1)
}

// 检查文件类型是否为图片
const isImage = (fileType) => {
  return fileType.startsWith('image/')
}

// 处理文件选择
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

// 上传文件
const uploadFile = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('pageId', props.pageId)
  formData.append('tableId', props.tableId)
  formData.append('file', selectedFile.value)

  try {
    const response = await fetch(`${API_BASE}/api/travel-data`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('上传失败')
    }

    // 刷新附件列表
    await loadData()
    selectedFile.value = null
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败: ' + error.message)
  }
}

// 保存数据
const saveData = async () => {
  try {
    const formData = new FormData()
    formData.append('pageId', props.pageId)
    formData.append('tableId', props.tableId)
    formData.append('data', JSON.stringify(tableData.value))

    const url = `${API_BASE}/api/travel-data`.replace(/\/+/g, '/')
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '保存失败')
    }

    // 保存成功后切换回只读模式
    isEditable.value = false
    alert('保存成功')
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败: ' + error.message)
  }
}

// 加载数据
const loadData = async () => {
  try {
    const url = `${API_BASE}/api/travel-data`.replace(/\/+/g, '/')
    const response = await fetch(
      `${url}?pageId=${props.pageId}&tableId=${props.tableId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '加载失败')
    }
    
    const data = await response.json()
    tableData.value = data.rows || []
    attachments.value = data.attachments || []
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})

// 在组件挂载时初始化文本框高度
onMounted(() => {
  const textareas = document.querySelectorAll('.textarea-field')
  textareas.forEach(autoGrow)
})

// 处理日期时间变化
const handleDateTimeChange = (event, row, header) => {
  const value = event.target.value
  if (value) {
    row[header] = value
  }
}

// 获取列宽
const getColumnWidth = (header) => {
  const type = columnTypes.value[header]
  switch (type) {
    case 'datetime':
      return { width: '160px' }  // 日期时间固定宽度
    case 'number':
      return { width: '100px' }  // 数字列固定宽度
    default:
      // 其他列自适应，但活动类列更宽
      return header.includes('活动') ? { width: '30%' } : { width: 'auto' }
  }
}

// 获取列的 CSS 类
const getColumnClass = (header) => {
  return {
    'datetime-column': columnTypes.value[header] === 'datetime',
    'number-column': columnTypes.value[header] === 'number',
    'text-column': columnTypes.value[header] === 'text',
    'activity-column': header.includes('活动')
  }
}

const isEditable = ref(false)
const showUnlock = ref(false)
const password = ref('')

// 显示解锁对话框
const showUnlockDialog = () => {
  showUnlock.value = true
  password.value = ''
}

// 处理解锁
const handleUnlock = () => {
  const correctPassword = import.meta.env.VITE_TABLE_PASSWORD
  if (password.value === correctPassword) {
    isEditable.value = true
    showUnlock.value = false
    password.value = '' // 清空密码输入框
  } else {
    alert('密码错误')
  }
}

// 格式化显示值
const formatDisplayValue = (value, header) => {
  if (!value) return '-'
  if (columnTypes.value[header] === 'number') {
    return formatNumber(value, header)
  }
  return value
}
</script>

<style scoped>
.editable-table {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-container {
  position: relative;
  max-height: 500px;
  overflow: auto;
  border: 0px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
}

thead {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #f5f5f5;
}

th {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}

td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}

.action-col {
  width: 40px;
}

/* 输入框样式 */
.input-field {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 暗色主题适配 */
:root[data-theme="dark"] {
  .table-container {
    border-color: #444;
    background-color: #1a1a1a;
  }

  th {
    background-color: #2c2c2c;
    border-bottom-color: #444;
  }

  td {
    border-bottom-color: #444;
    background-color: #1a1a1a;
  }
}

/* 美化滚动条 */
.table-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 按钮样式 */
.table-actions {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
}

.add-btn, .save-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.add-btn {
  background-color: #4CAF50;
}

.save-btn {
  background-color: #2196F3;
}

.delete-btn {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0;
  line-height: 1;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.readonly-text {
  padding: 6px 0;
  display: block;
}

.unlock-container {
  margin-top: 0rem;
  text-align: center;
}

.unlock-btn {
  padding: 6px 12px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.unlock-btn:hover {
  background-color: #555;
}

.unlock-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.unlock-dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.password-input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.dialog-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.confirm-btn, .cancel-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

/* 暗色主题适配 */
:root[data-theme="dark"] {
  .unlock-dialog-content {
    background-color: #2c2c2c;
    color: white;
  }

  .password-input {
    background-color: #1a1a1a;
    border-color: #444;
    color: white;
  }
}
</style>