import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import typeOrmConfig from './config/typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    })
    , TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig
    }), UserModule, PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
