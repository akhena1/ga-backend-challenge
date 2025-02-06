import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../../../../../../domain/contracts/http/baseResponse';
import { PurchaseEntity } from '../../../../../entities/purchase.entity';

@ObjectType()
export class DeletePurchaseResponse implements BaseResponse<PurchaseEntity> {
  @Field()
  message: string;

  @Field({ nullable: true })
  data?: PurchaseEntity;
}
