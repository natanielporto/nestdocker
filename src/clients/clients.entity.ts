import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import NodeRSA from 'node-rsa';

// const key = new NodeRSA({ b: 512 });

@ObjectType()
@Entity()
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
