import axios from 'axios'
import store from '../store.js'
import $router from '../router'
import { DEV_API } from './http.init'

let baseURL

if (process.env.NODE_ENV === 'development') baseURL = DEV_API
else baseURL = '/api'

export class AuthService {
  static async makeLogin(username, password) {
    const { data } = await axios.post(`${baseURL}/auth/login`, {
      username,
      password
    })
    this.setToken(data)
    store.dispatch('setUsername', data.username)
  }

  static async makeRegister(username, password) {
    const { data } = await axios.post(`${baseURL}/auth/register`, {
      username,
      password
    })
    this.setToken(data)
    store.dispatch('setUsername', data.username)
  }

  static async makeLogout() {
    this.setToken()
    $router.push({ name: 'login' })
    store.dispatch('setUsername', '')
    store.dispatch('setAuth', false)
  }

  static isTokenExpired() {
    const token = localStorage.getItem('accessToken')
    if (!token) return true
    const { exp } = JSON.parse(token)
    if (exp < Date.now() / 1000) return true
    store.dispatch('setUsername', JSON.parse(token).username)
    return false
  }

  static getBearer() {
    const { token } = JSON.parse(localStorage.getItem('accessToken'))
    return `Bearer ${token}`
  }

  static setToken(data) {
    if (!data) return localStorage.removeItem('accessToken')
    const { token, exp, username } = data
    localStorage.setItem(
      'accessToken',
      JSON.stringify({
        token,
        exp,
        username
      })
    )
  }
}
