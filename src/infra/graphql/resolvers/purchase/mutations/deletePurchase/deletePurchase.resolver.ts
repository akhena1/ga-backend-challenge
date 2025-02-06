import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeletePurchase } from '../../../../../../application/use-cases/purchase/deletePurchase';
import { PurchaseEntity } from '../../../../entities/purchase.entity';
import { DeletePurchaseInput } from './inputs/deletePurchase.input';
import { DeletePurchaseResponse } from './outputs/deletePurchase.response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';

@Resolver(() => PurchaseEntity)
export class DeletePurchaseResolver {
  constructor(private readonly deletePurchaseUseCase: DeletePurchase) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeletePurchaseResponse)
  async deletePurchase(@Args('deletePurchaseInput') id: DeletePurchaseInput) {
    try {
      return await this.deletePurchaseUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  }
}
