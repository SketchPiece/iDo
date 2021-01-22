import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectsService } from './projects.service'

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProjects(@Req() req) {
    return this.projectsService.getAll(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(@Req() { user }, @Body() createProject: CreateProjectDto) {
    return this.projectsService.create(user.id, createProject)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user },
    @Body() updateProject: UpdateProjectDto
  ) {
    return this.projectsService.update(id, user.id, updateProject)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@Param('id') id: number, @Req() { user }) {
    return this.projectsService.delete(id, user.id)
  }
}
