<template>
  <div class="p-8 max-w-md">
    <h1 class="text-3xl font-bold mb-6">👤 Profile</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div class="flex flex-col items-center gap-4">
        <img :src="profileImage" class="w-24 h-24 rounded-full object-cover" />

        <input v-model="username" class="border p-2 rounded w-full" placeholder="Enter username" />

        <button @click="saveProfile" class="bg-green-500 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref('Guest User')
const profileImage = ref('https://i.pravatar.cc/100')

onMounted(() => {
  const storedName = localStorage.getItem('username')
  const storedImage = localStorage.getItem('profileImage')

  if (storedName) username.value = storedName
  if (storedImage) profileImage.value = storedImage
})

const saveProfile = () => {
  localStorage.setItem('username', username.value)
  localStorage.setItem('profileImage', profileImage.value)
  alert('Profile Saved!')
}
</script>
