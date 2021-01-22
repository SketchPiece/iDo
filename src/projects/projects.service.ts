import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Project } from 'src/models/project.entity'
import { Repository } from 'typeorm'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async getAll(userId): Promise<Project[]> {
    return this.projectRepository.find({
      where: { user: { id: userId } },
      relations: ['tasks']
    })
  }
  async create(userId: number, { name }: CreateProjectDto): Promise<Project> {
    const { user, ...project } = await this.projectRepository.save({
      name,
      user: { id: userId }
    })
    return <Project>project
  }

  private async getAndCheckUser(id, userId) {
    console.log(id, userId)
    const projectWithUser = await this.projectRepository.findOne(id, {
      relations: ['user']
    })
    console.log('proj', projectWithUser)
    if (projectWithUser.user.id !== userId) throw new ForbiddenException()
    const { user, ...project } = projectWithUser
    return project
  }

  async update(id, userId, { name }: UpdateProjectDto) {
    const project = await this.getAndCheckUser(id, userId)
    return await this.projectRepository.save({ ...project, name })
  }

  async delete(id, userId) {
    await this.getAndCheckUser(id, userId)
    await this.projectRepository.delete(id)
    return {
      statusCode: 200,
      message: `project with id ${id} successfully deleted`
    }
  }
}
