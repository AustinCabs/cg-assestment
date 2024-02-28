import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfig from './config/typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    })
    , TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
