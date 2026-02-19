<template>
  <div class="min-h-screen flex flex-col items-center px-6 py-12">

    <!-- Back -->
    <button @click="router.back()" class="self-start mb-8 text-sm text-gray-500 hover:underline">
      ← Back
    </button>

    <!-- Main Layout -->
    <div class="max-w-4xl w-full flex flex-col md:flex-row gap-12 items-center">

      <!-- Cover Image -->
      <div class="w-72 h-72 rounded-3xl overflow-hidden shadow-lg cursor-pointer" @click="openFullscreen">
        <img :src="currentSong.cover" class="w-full h-full object-cover" />
      </div>

      <!-- Info + Player -->
      <div class="flex flex-col w-full max-w-md">

        <h1 class="text-3xl font-semibold mb-2">
          {{ currentSong.title }}
        </h1>

        <p class="text-gray-500 mb-6">
          {{ currentSong.artist }}
        </p>

        <!-- AUDIO ELEMENT -->
        <audio ref="audioPlayer" :src="currentSong.audio"></audio>

        <!-- Controls -->
        <div class="flex items-center gap-4 mb-4">
          <button @click="prevSong" class="px-3 py-2 border rounded-lg">⏮</button>
          <button @click="togglePlay" class="px-6 py-2 bg-black text-white rounded-lg">
            {{ isPlaying ? 'Pause' : 'Play' }}
          </button>
          <button @click="nextSong" class="px-3 py-2 border rounded-lg">⏭</button>
        </div>

        <!-- Volume -->
        <div class="flex items-center gap-3">
          <span class="text-sm">🔊</span>
          <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume" class="w-full" />
        </div>

        <!-- Music Video Button -->
        <button @click="goToMusicVideo"
          class="mt-6 border border-black rounded-xl py-2 hover:bg-black hover:text-white transition">
          View Music Video
        </button>

      </div>
    </div>

    <!-- FULLSCREEN MODAL -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div class="relative w-full h-full flex flex-col items-center justify-center">

        <!-- Image Layer -->
        <img :src="currentSong.cover" :style="{ transform: `scale(${zoomLevel})` }"
          class="max-h-[80vh] transition z-10" />

        <!-- Controls Layer -->
        <div class="absolute bottom-10 flex gap-4 z-20">
          <button @click="zoomOut" class="bg-white px-4 py-2 rounded shadow">
            −
          </button>

          <button @click="zoomIn" class="bg-white px-4 py-2 rounded shadow">
            +
          </button>

          <button @click="closeFullscreen" class="bg-red-500 text-white px-4 py-2 rounded shadow">
            Close
          </button>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const audioPlayer = ref(null)
const isPlaying = ref(false)
const volume = ref(1)

const isFullscreen = ref(false)
const zoomLevel = ref(1)

const songs = [
  {
    id: 1,
    title: 'Walking Back Home',
    artist: 'FUR',
    cover: 'https://ik.imagekit.io/demo/img/image1.jpeg',
    audio: 'https://res.cloudinary.com/dgjqwkpxs/video/upload/v1770915457/FUR_-_Walking_Back_Home_Vira_Talisa_Cover___Live_from_The_Close_Encounter_Club_wggitx.mp3',
  },
  {
    id: 2,
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://ik.imagekit.io/demo/img/image2.jpeg',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
]

const currentIndex = ref(
  songs.findIndex(s => s.id === Number(route.params.id))
)

const currentSong = computed(() => songs[currentIndex.value])

/* ---------- PLAYER CONTROLS ---------- */

const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const changeVolume = () => {
  audioPlayer.value.volume = volume.value
}

const nextSong = () => {
  currentIndex.value = (currentIndex.value + 1) % songs.length
  restartAudio()
}

const prevSong = () => {
  currentIndex.value =
    (currentIndex.value - 1 + songs.length) % songs.length
  restartAudio()
}

const restartAudio = () => {
  audioPlayer.value.pause()
  isPlaying.value = false
}

/* ---------- FULLSCREEN IMAGE ---------- */

const openFullscreen = () => {
  isFullscreen.value = true
  zoomLevel.value = 1
}

const closeFullscreen = () => {
  isFullscreen.value = false
}

const zoomIn = () => {
  zoomLevel.value += 0.2
}

const zoomOut = () => {
  if (zoomLevel.value > 0.4) {
    zoomLevel.value -= 0.2
  }
}

/* ---------- MUSIC VIDEO ---------- */

const goToMusicVideo = () => {
  router.push(`/music-video/${currentSong.value.id}`)
}
</script>
