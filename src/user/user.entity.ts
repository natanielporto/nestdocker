import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MyCrypto } from 'src/helpers/crypto';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
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
}
