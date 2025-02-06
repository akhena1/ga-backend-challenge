import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsObject, IsString, IsUUID } from 'class-validator';

@InputType()
class UpdateAddressDataInput {
  @Field({ nullable: true })
  @IsString()
  street: string;

  @Field({ nullable: true })
  @IsNumber()
  number: number;

  @Field({ nullable: true })
  @IsString()
  zipCode: string;

  @Field({ nullable: true })
  @IsString()
  city: string;

  @Field({ nullable: true })
  @IsString()
  state: string;

  @Field({ nullable: true })
  @IsString()
  complement: string;
}

@InputType()
export class UpdateAddressInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsObject()
  data: UpdateAddressDataInput;
}
