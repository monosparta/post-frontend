import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { type UserModule } from '~/types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = (app) => {
  const pinia = createPinia()
  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
  app.use(pinia)
  app.use(router)
}
