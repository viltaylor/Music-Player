import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongDetailView from '../views/SongDetailView.vue'
import MusicVideoView from '../views/MusicVideoView.vue'
import MusicVideoDetailView from '../views/MusicVideoDetail.vue'
import ProfileView from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/song/:id', name: 'songDetail', component: SongDetailView },
  { path: '/music-video', name: 'musicVideo', component: MusicVideoView },
  { path: '/music-video/:id', name: 'musicVideoDetail', component: MusicVideoDetailView },
  { path: '/profile', name: 'profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
