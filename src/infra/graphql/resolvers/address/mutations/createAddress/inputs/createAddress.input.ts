import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field()
  @IsString()
  street: string;

  @Field()
  @IsNumber()
  number: number;

  @Field()
  @IsString()
  zipCode: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  complement?: string;

  @Field()
  @IsUUID()
  userId: string
}
