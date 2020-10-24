import { ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { MyCrypto } from 'src/helpers/crypto';

@ObjectType()
@Entity()
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    transformer: MyCrypto,
  })
  name: string;

  @Column({
    transformer: MyCrypto,
  })
  email: string;

  @Column({
    transformer: MyCrypto,
  })
  phone: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
