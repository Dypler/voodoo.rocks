import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import HomePage from './pages/HomePage.vue'

const routes = [{ path: '/', name: 'Home', component: HomePage }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App).use(createPinia())

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
