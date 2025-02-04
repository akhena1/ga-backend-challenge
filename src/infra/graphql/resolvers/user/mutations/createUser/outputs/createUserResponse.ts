import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../../../../../../domain/contracts/http/baseResponse';
import { UserEntity } from '../../../../../entities/user.entity';

@ObjectType()
export class CreateUserResponse implements BaseResponse<UserEntity> {
  @Field()
  message: string;

  @Field({ nullable: true })
  data: UserEntity;
}
