import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Purchase } from 'src/domain/entities/purchase';

@ObjectType('Purchase')
@Entity('Purchase')
export class PurchaseEntity implements Purchase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Field()
  @CreateDateColumn()
  purchaseDate: Date;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.purchases, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
