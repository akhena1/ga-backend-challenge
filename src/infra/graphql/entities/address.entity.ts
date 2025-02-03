import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Address } from 'src/domain/entities/address';

@ObjectType('Address')
@Entity('Address')
export class AddressEntity implements Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  uf: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
