import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' }) //custom name
  user: User
}
