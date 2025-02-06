import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAddress } from '../../../../../../application/use-cases/address/createAddress';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';
import { AddressEntity } from '../../../../entities/address.entity';
import { CreateAddressInput } from './inputs/createAddress.input';
import { CreateAddressResponse } from './outputs/createAddress.response';

@Resolver(() => AddressEntity)
export class CreateAddressResolver {
  constructor(private readonly createAddressUseCase: CreateAddress) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateAddressResponse)
  async createAddress(@Args('createAddressInput') params: CreateAddressInput) {
    try {
      return await this.createAddressUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
