import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetPurchasesByUserId } from '../../../../../application/use-cases/purchase/getPurchasesByUserId';
import { PurchaseEntity } from '../../../entities/purchase.entity';

@Resolver(() => PurchaseEntity)
export class PurchaseQueryResolver {
  constructor(
    private readonly getPurchasesByUserIdUseCase: GetPurchasesByUserId,
  ) {}

  @Query(() => [PurchaseEntity])
  async getPurchasesByUserId(@Args('userId') userId: string) {
    return await this.getPurchasesByUserIdUseCase.execute(userId);
  }
}
