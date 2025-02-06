import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetPurchasesByUserId } from '../../../../../application/use-cases/purchase/getPurchasesByUserId';
import { JwtAuthGuard } from '../../../../providers/auth/guards/jwtAuth.guard';
import { PurchaseEntity } from '../../../entities/purchase.entity';

@Resolver(() => PurchaseEntity)
export class PurchaseQueryResolver {
  constructor(
    private readonly getPurchasesByUserIdUseCase: GetPurchasesByUserId,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [PurchaseEntity])
  async getPurchasesByUserId(@Args('userId') userId: string) {
    return await this.getPurchasesByUserIdUseCase.execute(userId);
  }
}
