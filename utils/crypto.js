// 使用 AES 加密
export function encrypt(text, key) {
  if (!text) return text
  const textToEncrypt = text.toString()
  // 这里使用一个简单的加密示例，实际使用时应该使用更安全的加密方法
  return btoa(textToEncrypt)
}

// 解密
export function decrypt(encryptedText, key) {
  if (!encryptedText) return encryptedText
  // 对应的解密方法
  return atob(encryptedText)
} 