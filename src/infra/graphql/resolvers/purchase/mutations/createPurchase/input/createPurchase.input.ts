import { Field, InputType } from '@nestjs/graphql';
import { IsDecimal, IsUUID } from 'class-validator';

@InputType()
export class CreatePurchaseInput {
  @Field()
  @IsDecimal()
  totalAmount: string;

  @Field()
  @IsUUID()
  userId: string;
}
