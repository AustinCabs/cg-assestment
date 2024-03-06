import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuardLocal } from './auth-local.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuardJwt } from './auth-jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token:this.authService.getTokenForUser(user)
    }
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
