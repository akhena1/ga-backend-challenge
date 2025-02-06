import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetAddressesByUserId } from '../../../../../application/use-cases/address/getAddressByUserId';
import { JwtAuthGuard } from '../../../../providers/auth/guards/jwtAuth.guard';
import { AddressEntity } from '../../../entities/address.entity';

@Resolver(() => AddressEntity)
export class AddressQueryResolver {
  constructor(
    private readonly getAddressesByUserIdUseCase: GetAddressesByUserId,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressEntity])
  async getAddressesByUserId(@Args('userId') userId: string) {
    return await this.getAddressesByUserIdUseCase.execute(userId);
  }
}
