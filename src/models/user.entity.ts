import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Project } from './project.entity'
import { Task } from './task.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany(() => Project, project => project.user, { cascade: true })
  projects: Project[]

  @OneToMany(() => Task, task => task.user, { cascade: true })
  tasks: Task[]
}
