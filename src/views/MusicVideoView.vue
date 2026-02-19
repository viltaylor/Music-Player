<template>
  <div class="min-h-screen px-6 py-16 flex flex-col items-center">
    <!-- Back Button -->
    <button @click="goHome" class="self-start mb-6 text-sm text-gray-500 hover:underline">
      ← Back to Home
    </button>
    <!-- Title -->
    <h1 class="text-4xl font-semibold mb-12">
      Music Videos
    </h1>

    <!-- Video Cards -->
    <div class="flex flex-col gap-8 w-full max-w-3xl">

      <div v-for="video in musicVideos" :key="video.id" @click="goToDetail(video.id)"
        class="cursor-pointer border border-gray-200 rounded-3xl p-6 flex items-center gap-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        <!-- Cover -->
        <div class="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
          <img :src="video.cover" class="w-full h-full object-cover" />
        </div>

        <!-- Info -->
        <div class="flex flex-col">
          <h2 class="text-xl font-semibold mb-2">
            {{ video.title }}
          </h2>
          <p class="text-gray-500 text-sm">
            {{ video.artist }}
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}

// Dummy data (same length as songs)
const musicVideos = [
  {
    id: 1,
    title: 'Blinding Lights (Official MV)',
    artist: 'The Weeknd',
    cover: 'https://ik.imagekit.io/demo/img/image1.jpeg'
  },
  {
    id: 2,
    title: 'Levitating (Official MV)',
    artist: 'Dua Lipa',
    cover: 'https://ik.imagekit.io/demo/img/image2.jpeg'
  }
]

const goToDetail = (id) => {
  router.push(`/music-video/${id}`)
}
</script>
