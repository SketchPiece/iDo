import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from 'src/models/task.entity'
import { Project } from 'src/models/project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
