import { createApp } from 'vue'
// import { createRouter, createWebHistory, useRouter } from 'vue-router'
// import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import './styles/main.css'
import './styles/loader.css'
import type { UserModule } from './types'
// import generatedRoutes from '~pages'

// const routes = setupLayouts(generatedRoutes)
// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

const app = createApp(App)

// Load modules
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))

// app.use(router)
app.mount('#app')
