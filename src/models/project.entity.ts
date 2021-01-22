import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Task } from './task.entity'
import { User } from './user.entity'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  created: Date

  @OneToMany(() => Task, task => task.project)
  tasks: Task[]

  @ManyToOne(() => User, user => user.projects)
  user: User
}
