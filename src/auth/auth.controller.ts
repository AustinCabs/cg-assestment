import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuardLocal } from './auth-local.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {

  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: "TEst token"
    }
  }
}
