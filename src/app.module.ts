import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProjectsModule } from './projects/projects.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist')
    }),
    ProjectsModule,
    TasksModule
  ]
})
export class AppModule {}
