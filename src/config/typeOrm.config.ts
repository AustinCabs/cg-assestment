import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export default ():TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, //orginal = root because i change it using local mysql
  database: process.env.DB_DATABASE,
  entities: [],
  synchronize: true // Auto-create database schema (for development)
})
