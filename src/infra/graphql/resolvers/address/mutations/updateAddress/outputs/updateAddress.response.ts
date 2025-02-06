import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../../../../../../domain/contracts/http/baseResponse';
import { AddressEntity } from '../../../../../entities/address.entity';

@ObjectType()
export class UpdateAddressResponse implements BaseResponse<AddressEntity> {
  @Field()
  message: string;

  @Field({ nullable: true })
  data: AddressEntity;
}
