import { AuthService } from './auth.service'

function _getStatusMessage(status) {
  let message = ''
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed'
      break
    case 201:
      message = 'Data successfully created'
      break
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Need auth'
      break
    case 404:
      message = 'Not found'
      break
    case 503:
      message = 'Service unavailable. Try again later'
      break
    default:
      message = 'Something wrong. Client default error message'
      break
  }
  return message
}

export class ResponseWrapper {
  constructor(response, data = {}, message) {
    this.data = data
    this.success = response.data.success
    this.status = response.status
    this.statusMessage = _getStatusMessage(this.status)
    this.message = message || null
  }
}

export const ErrorWrapper = error => {
  if (error.response && error.response.status === 401)
    return AuthService.makeLogout()
  throw error
}
