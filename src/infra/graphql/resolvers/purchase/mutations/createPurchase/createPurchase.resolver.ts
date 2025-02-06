import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PurchaseEntity } from '../../../../entities/purchase.entity';
import { CreatePurchase } from '../../../../../../application/use-cases/purchase/createPurchase';
import { CreatePurchaseInput } from './input/createPurchase.input';
import { CreatePurchaseResponse } from './output/createPurchase.response';

@Resolver(() => PurchaseEntity)
export class CreatePurchaseResolver {
  constructor(private readonly createPurchaseUseCase: CreatePurchase) {}

  @Mutation(() => CreatePurchaseResponse)
  async createPurchase(@Args('createPurchaseInput') params: CreatePurchaseInput) {
    try {
      return await this.createPurchaseUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
