# 旅行预算计算器 🧮

## 预算计算工具

<div class="calculator">
  <div class="input-group">
    <label>旅行天数</label>
    <input type="number" id="days" placeholder="输入计划旅行天数">
  </div>
  
  <div class="input-group">
    <label>每日预算</label>
    <select id="budget-level">
      <option value="economic">经济型 (500-800元/天)</option>
      <option value="comfort">舒适型 (800-1500元/天)</option>
      <option value="luxury">奢华型 (1500元以上/天)</option>
    </select>
  </div>
  
  <div class="input-group">
    <label>目的地选择</label>
    <select id="destination" multiple>
      <option value="europe">欧洲</option>
      <option value="asia">亚洲</option>
      <option value="america">美洲</option>
      <option value="oceania">大洋洲</option>
    </select>
  </div>
  
  <button onclick="calculateBudget()">计算预算</button>
  
  <div id="result" class="result-section">
    预计总预算将在这里显示
  </div>
</div>

<script>
function calculateBudget() {
  // 预算计算逻辑
}
</script> 