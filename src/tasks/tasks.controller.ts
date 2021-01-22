import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() { user }) {
    return this.tasksService.getAll(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Req() { user }, @Body() createTask: CreateTaskDto) {
    return this.tasksService.create(user.id, createTask)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(
    @Param('id') id,
    @Req() { user },
    @Body() updateTask: UpdateTaskDto
  ) {
    return this.tasksService.update(id, user.id, updateTask)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@Param('id') id: number, @Req() { user }) {
    return this.tasksService.delete(id, user.id)
  }
}
