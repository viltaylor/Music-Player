<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">🎬 Music Videos</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="video in videos"
        :key="video.id"
        @click="goToDetail(video.id)"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer hover:scale-105 transition p-4"
      >
        <img :src="video.cover" class="w-full h-48 object-cover rounded-md" />
        <h2 class="text-xl font-semibold mt-4">
          {{ video.title }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400">
          {{ video.artist }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const videos = [
  {
    id: 1,
    title: 'Blinding Lights (MV)',
    artist: 'The Weeknd',
    cover: 'https://ik.imagekit.io/demo/img/image3.jpeg',
  },
  {
    id: 2,
    title: 'Levitating (MV)',
    artist: 'Dua Lipa',
    cover: 'https://ik.imagekit.io/demo/img/image4.jpeg',
  },
]

const goToDetail = (id) => {
  router.push(`/music-video/${id}`)
}
</script>
