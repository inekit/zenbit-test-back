import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  email: String
  
  @Column()
  name: String;

  
}