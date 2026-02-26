<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
  >
    <!-- Title -->
    <h1 class="text-4xl font-semibold mb-16">SpoJeDy</h1>

    <!-- Navbar -->
    <nav class="flex gap-10 mb-10 text-sm">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <RouterLink to="/music-video" class="hover:underline">Music Video</RouterLink>
      <RouterLink to="/profile" class="hover:underline">Profile</RouterLink>
    </nav>

    <!-- Song Cards -->
    <div class="flex flex-col gap-8 w-full max-w-100">
      <div
        v-for="song in songs"
        :key="song.id"
        @click="goToDetail(song.id)"
        class="cursor-pointer border border-gray-300 rounded-3xl p-6 flex items-center gap-6 hover:shadow-lg transition"
      >
        <!-- Cover (Left Square) -->
        <div class="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200">
          <img :src="song.cover" class="w-full h-full object-cover" />
        </div>

        <!-- Text Content (Right Side) -->
        <div class="flex flex-col justify-center">
          <h2 class="text-xl font-semibold mb-2">
            {{ song.title }}
          </h2>
          <p class="text-gray-500 text-sm">
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
    title: 'Walking Back Home',
    artist: 'FUR',
    cover: 'https://ik.imagekit.io/demo/img/image1.jpeg',
  },
  {
    id: 2,
    title: 'Nina',
    artist: 'Feast.',
    cover: 'https://ik.imagekit.io/demo/img/image2.jpeg',
  },
]

const goToDetail = (id) => {
  router.push(`/song/${id}`)
}
</script>
