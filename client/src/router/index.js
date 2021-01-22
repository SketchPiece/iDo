import { createRouter, createWebHistory } from 'vue-router'
import { checkAccessMiddleware } from './middlewares'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(checkAccessMiddleware)

export default router
