import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';

@InputType()
class DataInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsObject()
  data: DataInput;
}
