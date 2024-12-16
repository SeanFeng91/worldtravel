<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const ID = '_disqus_js'

onMounted(() => {
  const s = document.createElement('script')
  s.id = ID
  s.src = 'https://worldtravel-1.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  document.body.appendChild(s)
})

onBeforeUnmount(() => {
  document.getElementById(ID)?.remove()
})
</script>

<template>
  <br/>
  <div id="disqus_thread" />
</template>