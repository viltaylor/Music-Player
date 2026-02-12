<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">🎬 Music Video Detail</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <img
        src="https://ik.imagekit.io/demo/img/image3.jpeg"
        class="w-64 h-64 object-cover rounded-md mb-4"
      />

      <h2 class="text-2xl font-semibold">Blinding Lights (MV)</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-4">The Weeknd</p>

      <div class="flex gap-4 mb-4">
        <button class="bg-green-500 px-4 py-2 rounded text-white">Play</button>
        <button class="bg-yellow-500 px-4 py-2 rounded text-white">Pause</button>
      </div>

      <button @click="goToSong" class="bg-blue-500 px-4 py-2 rounded text-white">Go to Song</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSong = () => {
  router.push('/song/1')
}
</script>
