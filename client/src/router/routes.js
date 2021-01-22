import Main from '../views/Main'

export const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      isAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]
