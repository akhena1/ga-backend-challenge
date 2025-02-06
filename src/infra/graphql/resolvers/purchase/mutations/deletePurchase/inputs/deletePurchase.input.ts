import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeletePurchaseInput {
  @Field()
  @IsUUID()
  id: string;
}
