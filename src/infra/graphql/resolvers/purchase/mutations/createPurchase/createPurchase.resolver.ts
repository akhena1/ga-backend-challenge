import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePurchase } from '../../../../../../application/use-cases/purchase/createPurchase';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';
import { PurchaseEntity } from '../../../../entities/purchase.entity';
import { CreatePurchaseInput } from './inputs/createPurchase.input';
import { CreatePurchaseResponse } from './outputs/createPurchase.response';

@Resolver(() => PurchaseEntity)
export class CreatePurchaseResolver {
  constructor(private readonly createPurchaseUseCase: CreatePurchase) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatePurchaseResponse)
  async createPurchase(
    @Args('createPurchaseInput') params: CreatePurchaseInput,
  ) {
    try {
      return await this.createPurchaseUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
