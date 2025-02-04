import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  message?: string;

  @Field()
  token?: string;

  @Field()
  userId?: string;
}
