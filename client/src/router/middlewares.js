import { AuthService } from '../services/auth.service'
import store from '../store'
export function checkAccessMiddleware(to, _, next) {
  const isAuthRoute = to.matched.some(item => item.meta.isAuth)
  if (isAuthRoute) {
    if (AuthService.isTokenExpired()) return next({ name: 'login' })
    // console.log(store)
    store.dispatch('setAuth', true)
    // store.state.auth = true
    return next()
  }
  return next()
}
