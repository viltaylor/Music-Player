<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const theme = ref('light')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    theme.value = savedTheme
  }

  applyTheme(theme.value)
})

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
})

function applyTheme(currentTheme) {
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
