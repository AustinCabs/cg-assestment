import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
