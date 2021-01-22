import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } })
  }

  async getById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id)
  }

  async create(user: User): Promise<User | null> {
    try {
      return await this.userRepository.save(user)
    } catch {
      return null
    }
  }
}
