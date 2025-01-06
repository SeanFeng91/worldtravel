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
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td v-for="header in props.headers" :key="header" 
                :class="getColumnClass(header)">
              <!-- 编辑模式 -->
              <template v-if="isEditable">
                <!-- 日期时间类型的单元格 -->
                <input
                  v-if="columnTypes[header] === 'datetime'"
                  type="datetime-local"
                  v-model="row[header]"
                  :min="minDate"
                  :max="maxDate"
                  :placeholder="getPlaceholder(header)"
                  class="datetime-input"
                >
                <!-- 图片类型的单元格 -->
                <div v-else-if="columnTypes[header] === 'image'" class="image-cell">
                  <img 
                    v-if="row[header]" 
                    :src="row[header]" 
                    @error="handleImageError"
                    class="cell-image"
                  >
                  <input
                    type="file"
                    :ref="el => setFileInputRef(el, rowIndex, header)"
                    @change="e => handleCellImageChange(e, rowIndex, header)"
                    accept="image/*"
                    class="hidden"
                  >
                  <button 
                    @click="triggerFileInput('cell', rowIndex, header)"
                    class="upload-btn small"
                  >
                    {{ row[header] ? '更换图片' : '上传图片' }}
                  </button>
                </div>
                <!-- 其他类型的单元格 -->
                <input
                  v-else
                  v-model="row[header]"
                  :type="columnTypes[header] || 'text'"
                  :placeholder="getPlaceholder(header)"
                >
              </template>
              <!-- 非编辑模式 -->
              <template v-else>
                <!-- 日期时间类型的单元格 -->
                <div v-if="columnTypes[header] === 'datetime'">
                  {{ formatDisplayValue(row[header], header) }}
                </div>
                <!-- 图片类型的单元格 -->
                <div v-else-if="columnTypes[header] === 'image'" class="image-cell">
                  <img 
                    v-if="row[header]" 
                    :src="row[header]" 
                    @error="handleImageError"
                    @click="() => previewImage(row[header])"
                    class="cell-image"
                  >
                  <span v-else>-</span>
                </div>
                <!-- 其他类型的单元格 -->
                <span v-else>{{ formatDisplayValue(row[header], header) }}</span>
              </template>
            </td>
            <td v-if="isEditable" class="action-column">
              <button @click="removeRow(rowIndex)" class="delete-btn" title="删除">×</button>
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

    <!-- 附件上传按钮 -->
    <div v-if="isEditable" class="upload-section">
      <input
        type="file"
        ref="attachmentFileInput"
        @change="handleFileChange"
        :accept="acceptedFileTypes"
        multiple
        class="hidden"
      >
      <button @click="triggerFileInput('attachment')" class="upload-btn">
        上传附件
      </button>
      <span class="file-types">支持: 图片、PDF、Word、Excel 等</span>
    </div>

    <!-- 附件预览区域 -->
    <div class="attachments-preview" v-if="unusedAttachments.length">
      <div v-for="file in unusedAttachments" :key="file.key" class="attachment-item">
        <div class="attachment-container">
          <!-- 图片预览 -->
          <img 
            v-if="isImageFile(file.type)" 
            :src="file.url" 
            :alt="file.name"
            @error="handleImageError"
            class="preview-image"
          >
          <!-- 文档图标 -->
          <div v-else class="file-icon">
            <i :class="getFileIcon(file.type)"></i>
          </div>
        </div>
        <div class="attachment-info">
          <span class="file-name" :title="file.name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
        </div>
        <div class="attachment-actions">
          <button class="action-btn preview-btn" @click="previewFile(file)">
            {{ isImageFile(file.type) ? '查看' : '下载' }}
          </button>
          <button v-if="isEditable" @click="deleteFile(file)" class="action-btn delete-btn">删除</button>
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

const API_BASE = import.meta.env.VITE_WORKER_URL.replace(/\/+$/, '')
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
const minDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 5) // 允许过去五年
  return date.toISOString().slice(0, 16)
})

const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 5) // 允许未来五年
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

// 文件输入引用
const fileInputRefs = ref({})
const attachmentFileInput = ref(null)

// 设置文件输入引用
const setFileInputRef = (el, rowIndex, header) => {
  if (!fileInputRefs.value[rowIndex]) {
    fileInputRefs.value[rowIndex] = {}
  }
  fileInputRefs.value[rowIndex][header] = el
}

// 统一的文件选择触发函数
const triggerFileInput = (type, rowIndex = null, header = null) => {
  if (type === 'attachment') {
    attachmentFileInput.value?.click()
  } else if (type === 'cell') {
    fileInputRefs.value[rowIndex]?.[header]?.click()
  }
}

// 定义接受的文件类型
const acceptedFileTypes = '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx'

// 检查文件类型
const isImageFile = (fileType) => {
  return fileType?.startsWith('image/')
}

// 获取文件图标
const getFileIcon = (fileType) => {
  if (!fileType) return 'fas fa-file'
  if (fileType.includes('pdf')) return 'fas fa-file-pdf'
  if (fileType.includes('word') || fileType.includes('doc')) return 'fas fa-file-word'
  if (fileType.includes('sheet') || fileType.includes('excel')) return 'fas fa-file-excel'
  return 'fas fa-file'
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

// 处理附件上传
const handleFileChange = async (event) => {
  const files = event.target.files
  if (!files.length) return

  for (const file of files) {
    try {
      await uploadFile(file)
      await loadData()
    } catch (error) {
      console.error('上传失败:', error)
      alert(`上传失败: ${file.name}`)
    }
  }
  
  event.target.value = ''
}

// 处理文件上传
const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('pageId', props.pageId)
  formData.append('tableId', props.tableId)

  // 使用 URL 构造器确保正确的路径
  const url = new URL('/api/table-data/upload-file', API_BASE).toString()
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || '上传失败')
  }

  const result = await response.json()
  if (!result.success || !result.file) {
    throw new Error('上传返回数据格式错误')
  }

  return result.file
}

// 删除图片
const deleteImage = async (image) => {
  try {
    const url = new URL('/api/table-data/delete-image', API_BASE).toString()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageId: props.pageId,
        tableId: props.tableId,
        fileName: image.key
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '删除失败')
    }

    // 刷新数据
    await loadData()
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败: ' + error.message)
  }
}

// 保存数据
const saveData = async () => {
  try {
    // 确保数据是有效的
    const validData = tableData.value.map(row => {
      const newRow = {}
      props.headers.forEach(header => {
        // 确保数字类型的值是有效的数字
        if (columnTypes.value[header] === 'number') {
          newRow[header] = row[header] ? parseFloat(row[header]) || 0 : 0
        } else {
          newRow[header] = row[header] || ''
        }
      })
      return newRow
    })

    const formData = new FormData()
    formData.append('pageId', props.pageId)
    formData.append('tableId', props.tableId)
    formData.append('data', JSON.stringify(validData))

    const url = new URL('/api/table-data', API_BASE).toString()
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '保存失败')
    }

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
    // 确保 URL 正确拼接
    const url = new URL('/api/table-data', API_BASE).toString()
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
    
    // 打印附件信息以便调试
    console.log('加载的附件:', attachments.value)
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
  if (columnTypes.value[header] === 'datetime') {
    // 格式化日期时间显示
    try {
      const date = new Date(value)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return value
    }
  }
  return value
}

// 预览图片
const previewImage = (imageUrl) => {
  if (!imageUrl) return
  
  // 确保 URL 是完整的
  const fullUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${API_BASE}${imageUrl}`.replace(/\/+/g, '/')
    
  console.log('预览图片:', fullUrl) // 添加调试日志
  window.open(fullUrl, '_blank', 'noopener,noreferrer')
}

// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target
  console.error('图片加载失败:', img.src)
  
  if (!img.dataset.retried) {
    img.dataset.retried = 'true'
    // 尝试添加时间戳来避免缓存
    img.src = img.src + '?retry=' + Date.now()
  } else {
    img.style.display = 'none'
    img.parentElement.classList.add('image-error')
  }
}

// 处理单元格图片上传
const handleCellImageChange = async (event, rowIndex, header) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('只能上传图片文件')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('pageId', props.pageId)
    formData.append('tableId', props.tableId)
    formData.append('cellId', `${rowIndex}-${header}`)

    // 使用 URL 构造器确保正确的路径
    const url = new URL('/api/table-data/upload-cell-image', API_BASE).toString()
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '上传失败')
    }

    const result = await response.json()
    if (result.success && result.file && result.file.url) {
      tableData.value[rowIndex][header] = result.file.url
    } else {
      throw new Error('上传返回数据格式错误')
    }
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败: ' + error.message)
  }

  event.target.value = ''
}

// 计算未使用的附件
const unusedAttachments = computed(() => {
  // 获取所有表格中使用的图片 URL
  const usedImageUrls = new Set()
  tableData.value.forEach(row => {
    props.headers.forEach(header => {
      if (columnTypes.value[header] === 'image' && row[header]) {
        usedImageUrls.add(row[header])
      }
    })
  })

  // 返回未在表格中使用的附件
  return attachments.value.filter(attachment => !usedImageUrls.has(attachment.url))
})

// 预览或下载文件
const previewFile = (file) => {
  if (!file.url) return
  
  if (isImageFile(file.type)) {
    // 图片预览
    window.open(file.url, '_blank', 'noopener,noreferrer')
  } else {
    // 其他文件下载
    const a = document.createElement('a')
    a.href = file.url
    a.download = file.name
    a.click()
  }
}

// 删除文件
const deleteFile = async (file) => {
  try {
    // 使用 URL 构造器确保正确的路径
    const url = new URL('/api/table-data/delete-file', API_BASE).toString()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pageId: props.pageId,
        tableId: props.tableId,
        fileName: file.key
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '删除失败')
    }

    // 刷新数据
    await loadData()
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败: ' + error.message)
  }
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

.hidden {
  display: none;
}

.upload-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.file-types {
  color: #666;
  font-size: 0.9rem;
}

.attachments-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.attachment-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.attachment-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 1rem;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.file-icon {
  font-size: 2.5rem;
  color: #666;
}

.file-icon i {
  opacity: 0.8;
}

.attachment-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
}

.file-name {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.attachment-actions {
  display: flex;
  gap: 0.5rem;
}

/* 暗色主题适配 */
:root[data-theme="dark"] .attachment-item {
  border-color: #444;
  background: #2c2c2c;
}

:root[data-theme="dark"] .attachment-container {
  background: #1c1c1c;
}

:root[data-theme="dark"] .file-types,
:root[data-theme="dark"] .file-size {
  color: #999;
}

.upload-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.image-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 4px;
}

.cell-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.2s;
  padding: 2px;
  border: 1px solid #ddd;
}

.cell-image:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 暗色主题适配 */
:root[data-theme="dark"] .cell-image {
  background: #2c2c2c;
  border: 1px solid #444;
}

.image-error {
  color: #f44336;
  font-size: 12px;
  text-align: center;
}

.upload-btn.small {
  padding: 4px 8px;
  font-size: 12px;
}

.datetime-input {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.datetime-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

/* 暗色主题适配 */
:root[data-theme="dark"] .datetime-input {
  background-color: #2c2c2c;
  border-color: #444;
  color: #fff;
}
</style>