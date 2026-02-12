<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <!-- Navbar -->
    <nav class="flex gap-10 mb-10 text-sm">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <RouterLink to="/music-video" class="hover:underline">Music Video</RouterLink>
      <RouterLink to="/profile" class="hover:underline">Profile</RouterLink>
    </nav>

    <!-- Title -->
    <h1 class="text-4xl font-semibold mb-16">SpoJeDy</h1>

    <!-- Song Cards -->
    <div class="flex flex-col sm:flex-row gap-10">
      <div
        v-for="song in songs"
        :key="song.id"
        @click="goToDetail(song.id)"
        class="w-64 cursor-pointer border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition"
      >
        <!-- Cover -->
        <div class="w-full h-64 overflow-hidden">
          <img :src="song.cover" class="w-full h-full object-cover" />
        </div>

        <!-- Info -->
        <div class="p-4 text-center">
          <h2 class="text-lg font-medium">
            {{ song.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ song.artist }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const songs = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://ik.imagekit.io/demo/img/image1.jpeg',
  },
  {
    id: 2,
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://ik.imagekit.io/demo/img/image2.jpeg',
  },
]

const goToDetail = (id) => {
  router.push(`/song/${id}`)
}
</script>
