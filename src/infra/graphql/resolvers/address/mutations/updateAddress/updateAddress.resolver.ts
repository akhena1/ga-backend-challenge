import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateAddress } from 'src/application/use-cases/address/updateAddress';
import { AddressEntity } from 'src/infra/graphql/entities/address.entity';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';
import { UpdateAddressInput } from './inputs/updateAddress.input';
import { UpdateAddressResponse } from './outputs/updateAddress.response';

@Resolver(() => AddressEntity)
export class UpdateAddressResolver {
  constructor(private readonly updateAddressUseCase: UpdateAddress) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UpdateAddressResponse)
  async updateAddress(@Args('updateAddressInput') params: UpdateAddressInput) {
    try {
      return await this.updateAddressUseCase.execute({
        id: params.id,
        data: params.data,
      });
    } catch (error) {
      throw error;
    }
  }
}
