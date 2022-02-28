import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entry';

@Entity()
export class Form {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  message: String;

  @ManyToOne(type => User, user => user.email,{
    cascade: true,
})
  user:User
}