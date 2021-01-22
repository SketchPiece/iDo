import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtSecret } from '../constants'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    })
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub)
    if (!user) throw new UnauthorizedException()
    return { id: payload.sub, username: payload.username }
  }
}
