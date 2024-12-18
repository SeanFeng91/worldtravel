<template>
  <div class="exchange-rate-calculator">
    <div class="calculator-card">
      <h2 class="title">汇率计算器</h2>
      
      <div class="input-group">
        <label for="amount">金额</label>
        <input
          v-model.number="amount"
          id="amount"
          type="number"
          placeholder="输入金额"
          class="material-input"
        />
      </div>

      <div class="currency-selectors">
        <div class="input-group">
          <label for="fromCurrency">从</label>
          <select v-model="fromCurrency" id="fromCurrency" class="material-select">
            <option v-for="(rate, code) in rates" :key="code" :value="code">
              {{ code }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label for="toCurrency">到</label>
          <select v-model="toCurrency" id="toCurrency" class="material-select">
            <option v-for="(rate, code) in rates" :key="code" :value="code">
              {{ code }}
            </option>
          </select>
        </div>
      </div>

      <button @click="convertCurrency" class="material-button">计算</button>
      
      <div v-if="result" class="result">
        <span class="result-label">结果:</span>
        <span class="result-value">{{ result.toFixed(2) }} {{ toCurrency }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const amount = ref(1);
const fromCurrency = ref("USD");
const toCurrency = ref("CNY");
const result = ref(null);
const rates = ref({});

// 替换为您的汇率 API 密钥和 URL
const API_URL = "https://open.er-api.com/v6/latest/USD";

const fetchRates = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    rates.value = data.rates;
  } catch (error) {
    console.error("汇率数据加载失败:", error);
  }
};

const convertCurrency = () => {
  if (rates.value[fromCurrency.value] && rates.value[toCurrency.value]) {
    const rate =
      rates.value[toCurrency.value] / rates.value[fromCurrency.value];
    result.value = amount.value * rate;
  }
};

onMounted(fetchRates);
</script>

<style>
.exchange-rate-calculator {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.calculator-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 24px;
  width: 100%;
  max-width: 480px;
}

.title {
  color: #1976d2;
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 500;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
}

.material-input,
.material-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.material-input:focus,
.material-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.currency-selectors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.material-button {
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.material-button:hover {
  background-color: #1565c0;
}

.result {
  margin-top: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.result-label {
  color: #666;
  margin-right: 8px;
}

.result-value {
  color: #1976d2;
  font-size: 20px;
  font-weight: 500;
}
</style>
  