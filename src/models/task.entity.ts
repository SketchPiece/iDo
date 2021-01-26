import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Project } from './project.entity'
import { User } from './user.entity'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  text: string

  @Column({ default: false })
  completed: boolean

  @Column({ nullable: true })
  deadline: Date

  @Column({ default: false })
  priority: boolean

  @CreateDateColumn()
  created: Date

  @Column()
  projectId: number

  @ManyToOne(() => Project, project => project.tasks, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
  project: Project

  @ManyToOne(() => User, user => user.tasks)
  user: User
}
