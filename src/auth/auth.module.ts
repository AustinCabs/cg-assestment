import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
   JwtModule.registerAsync({
    useFactory: jwtConfig
   })
],
  providers: [UserService, AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
