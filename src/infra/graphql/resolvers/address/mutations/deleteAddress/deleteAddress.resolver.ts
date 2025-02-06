import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteAddress } from 'src/application/use-cases/address/deleteAddress';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';
import { AddressEntity } from '../../../../entities/address.entity';
import { DeleteAddressInput } from './inputs/deleteAddress.input';
import { DeleteAddressResponse } from './outputs/deleteAddress.response';

@Resolver(() => AddressEntity)
export class DeleteAddressResolver {
  constructor(private readonly deleteAddressUseCase: DeleteAddress) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeleteAddressResponse)
  async deleteAddress(@Args('deleteAddressInput') id: DeleteAddressInput) {
    try {
      return await this.deleteAddressUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  }
}
