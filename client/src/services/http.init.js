import axios from 'axios'
import { AuthService } from './auth.service'

export const DEV_API = 'http://localhost:3000/api'

const generateInstanceOptions = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      baseURL: DEV_API
    }
  } else {
    return {
      baseURL: '/api'
    }
  }
}

export class Http {
  constructor(status) {
    this.isAuth = status && status.auth ? status.auth : false
    this.instance = axios.create(generateInstanceOptions())

    return this.init()
  }

  init() {
    if (this.isAuth) {
      if (AuthService.isTokenExpired()) return AuthService.makeLogout()
      this.instance.interceptors.request.use(request => {
        request.headers.authorization = AuthService.getBearer()
        return request
      })
    }

    return this.instance
  }
}
