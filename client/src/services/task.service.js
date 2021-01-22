import { BaseService } from './base.service'
import { ErrorWrapper } from './utils'

export class TaskService extends BaseService {
  static async getAll() {
    try {
      const response = await this.request({ auth: true }).get('tasks')
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }
  static async add(task) {
    try {
      const response = await this.request({ auth: true }).post('tasks', task)
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }

  static async edit(id, task) {
    try {
      const response = await this.request({ auth: true }).put(
        `tasks/${id}`,
        task
      )
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }

  static async del(id) {
    try {
      const response = await this.request({ auth: true }).delete(`tasks/${id}`)
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }
}
