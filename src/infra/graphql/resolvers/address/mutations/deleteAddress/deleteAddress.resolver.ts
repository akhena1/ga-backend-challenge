import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteAddress } from 'src/application/use-cases/address/deleteAddress';
import { AddressEntity } from '../../../../entities/address.entity';
import { DeleteAddressInput } from './inputs/deleteAddress.input';
import { DeleteAddressResponse } from './outputs/deleteAddress.response';

@Resolver(() => AddressEntity)
export class DeleteAddressResolver {
  constructor(private readonly deleteAddressUseCase: DeleteAddress) {}

  @Mutation(() => DeleteAddressResponse)
  async deleteAddress(@Args('deleteAddressInput') id: DeleteAddressInput) {
    try {
      return await this.deleteAddressUseCase.execute(id);
    } catch (error) {
      throw error;
    }
  }
}
