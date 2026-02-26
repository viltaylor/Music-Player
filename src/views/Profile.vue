<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <div class="p-8 max-w-2xl mx-auto flex flex-col">
      <!-- Back Button -->
      <button
        @click="goHome"
        class="self-start mb-6 text-sm text-gray-500 hover:underline transition-all duration-200"
      >
        ← Back
      </button>

      <h1 class="text-3xl font-bold mb-6">👤 Profile</h1>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-black">
        <div class="flex flex-col items-center gap-5">
          <!-- Profile Image -->
          <div class="relative group">
            <img
              :src="profileImage"
              class="w-28 h-28 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            />

            <!-- Loading Spinner -->
            <div
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full"
            >
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>

            <!-- Overlay Button -->
            <button
              @click="triggerFileInput"
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
            >
              Change
            </button>
          </div>

          <!-- Hidden File Input -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
          />

          <!-- Username -->
          <input
            v-model="username"
            class="border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
            placeholder="Enter username"
          />

          <!-- Theme Toggle -->
          <div class="flex items-center justify-between w-full dark:text-white">
            <span>Theme</span>

            <select v-model="theme" class="border p-2 rounded dark:bg-gray-700 dark:text-white">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <!-- Save -->
          <button
            @click="saveProfile"
            class="w-full bg-black text-white py-2 rounded-xl hover:opacity-80 transition"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const goHome = () => {
  router.push('/')
}

const username = ref('Guest User')
const profileImage = ref('https://i.pravatar.cc/150')
const theme = ref('light')
const isLoading = ref(false)

/* ---------- LOAD FROM LOCAL STORAGE ---------- */
onMounted(() => {
  const storedName = localStorage.getItem('username')
  const storedImage = localStorage.getItem('profileImage')
  const storedTheme = localStorage.getItem('theme')

  if (storedName) username.value = storedName
  if (storedImage) profileImage.value = storedImage
  if (storedTheme) theme.value = storedTheme

  applyTheme()
})

/* ---------- APPLY THEME GLOBALLY ---------- */
watch(theme, () => {
  applyTheme()
})

const applyTheme = () => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/* ---------- IMAGE UPLOAD + COMPRESSION ---------- */
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  isLoading.value = true

  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = () => {
    const img = new Image()
    img.src = reader.result

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const maxSize = 500
      canvas.width = maxSize
      canvas.height = maxSize

      ctx.drawImage(img, 0, 0, maxSize, maxSize)

      canvas.toBlob(
        (blob) => {
          if (blob.size > 1024 * 1024) {
            alert('Image must be less than 1MB')
            isLoading.value = false
            return
          }

          const blobReader = new FileReader()
          blobReader.readAsDataURL(blob)

          blobReader.onloadend = () => {
            profileImage.value = blobReader.result
            isLoading.value = false
          }
        },
        'image/jpeg',
        0.7,
      )
    }
  }
}

/* ---------- SAVE ---------- */
const saveProfile = () => {
  localStorage.setItem('username', username.value)
  localStorage.setItem('profileImage', profileImage.value)
  localStorage.setItem('theme', theme.value)

  alert('Profile Saved!')
}
</script>
