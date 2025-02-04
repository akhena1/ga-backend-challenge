import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { PurchaseEntity } from './purchase.entity';

@ObjectType('User')
@Entity('User')
export class UserEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ default: false })
  disabled?: boolean;

  @Field(() => [AddressEntity], { nullable: true })
  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];

  @Field(() => [PurchaseEntity], { nullable: true })
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.user)
  purchases?: PurchaseEntity[];
}
