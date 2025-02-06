import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsString, IsUUID } from 'class-validator';

@InputType()
class UpdateUserDataInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsObject()
  data: UpdateUserDataInput;
}
