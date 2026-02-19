<template>
  <div class="min-h-screen px-6 py-12 flex flex-col items-center">

    <!-- Back -->
    <button @click="router.back()" class="self-start mb-8 text-sm text-gray-500 hover:underline">
      ← Back
    </button>

    <div class="w-full max-w-5xl">

      <!-- Title -->
      <h1 class="text-3xl font-semibold mb-2">
        {{ currentVideo.title }}
      </h1>

      <p class="text-gray-500 mb-6">
        {{ currentVideo.artist }}
      </p>

      <!-- Video Container -->
      <div class="relative rounded-3xl overflow-hidden shadow-xl">

        <video ref="videoPlayer" :src="currentVideo.video" class="w-full" @ended="nextVideo"></video>

        <!-- Custom Controls -->
        <div class="bg-black text-white p-4 flex flex-col gap-4">

          <!-- Control Buttons -->
          <div class="flex items-center gap-4">

            <button @click="prevVideo" class="px-3 py-2 border rounded-lg">
              ⏮
            </button>

            <button @click="togglePlay" class="px-6 py-2 bg-white text-black rounded-lg">
              {{ isPlaying ? 'Pause' : 'Play' }}
            </button>

            <button @click="nextVideo" class="px-3 py-2 border rounded-lg">
              ⏭
            </button>

            <button @click="toggleFullscreen" class="ml-auto px-4 py-2 border rounded-lg">
              Fullscreen
            </button>

          </div>

          <!-- Volume -->
          <div class="flex items-center gap-3">
            <span>🔊</span>
            <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume" class="w-full" />
          </div>

        </div>

      </div>

      <!-- Redirect to Song -->
      <button @click="goToSong"
        class="mt-8 border border-black rounded-xl py-2 px-6 hover:bg-black hover:text-white transition">
        Go to Song Detail
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const videoPlayer = ref(null)
const isPlaying = ref(false)
const volume = ref(1)

/* ---------- CDN VIDEO DATA ---------- */
/* Example using public CDN video */
const videos = [
  {
    id: 1,
    title: 'Blinding Lights (Official MV)',
    artist: 'The Weeknd',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 2,
    title: 'Levitating (Official MV)',
    artist: 'Dua Lipa',
    video: 'https://www.w3schools.com/html/movie.mp4'
  }
]

const currentIndex = ref(
  videos.findIndex(v => v.id === Number(route.params.id))
)

const currentVideo = computed(() => videos[currentIndex.value])

/* ---------- CONTROLS ---------- */

const togglePlay = () => {
  if (isPlaying.value) {
    videoPlayer.value.pause()
  } else {
    videoPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const changeVolume = () => {
  videoPlayer.value.volume = volume.value
}

const nextVideo = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.length
  restartVideo()
}

const prevVideo = () => {
  currentIndex.value =
    (currentIndex.value - 1 + videos.length) % videos.length
  restartVideo()
}

const restartVideo = () => {
  videoPlayer.value.pause()
  videoPlayer.value.load()
  videoPlayer.value.play()
  isPlaying.value = true
}

/* ---------- FULLSCREEN API ---------- */

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

/* ---------- REDIRECT ---------- */

const goToSong = () => {
  router.push(`/song/${currentVideo.value.id}`)
}
</script>
