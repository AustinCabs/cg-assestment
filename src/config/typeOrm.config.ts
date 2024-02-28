import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";


export default ():TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, //orginal = root because i change it using local mysql
  database: process.env.DB_DATABASE,
  entities: [User,Post],
  synchronize: true // Auto-create database schema (for development)
})
