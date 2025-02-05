import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Address } from '../../../domain/entities/address';

@ObjectType('Address')
@Entity('Address')
export class AddressEntity implements Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  number: number;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  complement?: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
