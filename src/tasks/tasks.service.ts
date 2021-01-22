import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from 'src/models/project.entity'
import { Task } from 'src/models/task.entity'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async getAll(userId): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: userId } }
    })
  }

  private async checkProject(userId, projectId) {
    const project = await this.projectRepository.findOne(projectId, {
      relations: ['user']
    })
    if (!project)
      throw new HttpException(
        `Project with id ${projectId} not found`,
        HttpStatus.NOT_FOUND
      )
    if (project.user.id !== userId) throw new ForbiddenException()
  }

  async create(userId: number, createTask: CreateTaskDto): Promise<Task> {
    await this.checkProject(userId, createTask.projectId)
    const { user, project, ...task } = await this.taskRepository.save({
      ...createTask,
      user: { id: userId },
      project: { id: createTask.projectId }
    })
    return <Task>task
  }

  private async getAndCheckUser(id, userId) {
    const taskWithUser = await this.taskRepository.findOne(id, {
      relations: ['user']
    })
    if (taskWithUser.user.id !== userId) throw new ForbiddenException()
    const { user, ...task } = taskWithUser
    return task
  }

  async update(id, userId, updateTask) {
    await this.checkProject(userId, updateTask.projectId)
    if (updateTask.id) delete updateTask.id
    const task = await this.getAndCheckUser(id, userId)
    return await this.taskRepository.save({ ...task, ...updateTask })
  }

  async delete(id, userId) {
    await this.getAndCheckUser(id, userId)
    await this.taskRepository.delete(id)
    return {
      statusCode: 200,
      message: `task with id ${id} successfully deleted`
    }
  }
}
