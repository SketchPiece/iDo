import { BaseService } from './base.service'
import { ErrorWrapper } from './utils'

export class ProjectService extends BaseService {
  static async getAll() {
    try {
      const response = await this.request({ auth: true }).get('projects')
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }
  static async add(project) {
    try {
      const response = await this.request({ auth: true }).post(
        'projects',
        project
      )
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }

  static async edit(id, project) {
    try {
      const response = await this.request({ auth: true }).put(
        `projects/${id}`,
        project
      )
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }

  static async del(id) {
    try {
      const response = await this.request({ auth: true }).delete(
        `projects/${id}`
      )
      return response.data
    } catch (err) {
      ErrorWrapper(err)
    }
  }
}
