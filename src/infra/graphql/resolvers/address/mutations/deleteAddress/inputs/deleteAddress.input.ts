import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteAddressInput {
  @Field()
  @IsUUID()
  id: string;
}
