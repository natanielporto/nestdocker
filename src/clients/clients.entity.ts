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
    type: 'varchar',
    nullable: false,
    transformer: MyCrypto,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    transformer: MyCrypto,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
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
