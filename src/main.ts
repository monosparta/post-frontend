import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import type { UserModule } from './types'

const app = createApp(App)

// Load modules
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))

// app.use(router)
app.mount('#app')
