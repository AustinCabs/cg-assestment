import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable:true})
  username: string

  @Column({nullable:true})
  password: string

  @Column()
  name: string

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true
  })
  posts: Post[]
}
