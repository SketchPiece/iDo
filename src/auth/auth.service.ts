import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/models/user.entity'
import { UsersService } from '../users/users.service'
import { jwtExpiresIn } from '../constants'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOne(username)
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async validateUserById(userId) {
    return await this.usersService.getById(userId)
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      token: this.jwtService.sign(payload),
      exp: Date.now() + jwtExpiresIn * 1000,
      username: user.username
    }
  }

  async register(user: User) {
    const newUser = await this.usersService.create(user)
    if (!newUser) throw new ConflictException()
    const payload = { username: newUser.username, sub: newUser.id }
    return {
      token: this.jwtService.sign(payload),
      exp: Date.now() + jwtExpiresIn * 1000,
      username: newUser.username
    }
  }
}
