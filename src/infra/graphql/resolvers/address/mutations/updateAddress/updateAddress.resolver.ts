import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressEntity } from 'src/infra/graphql/entities/address.entity';
import { UpdateAddress } from 'src/application/use-cases/address/updateAddress';
import { UpdateAddressInput } from './inputs/updateAddress.input';
import { UpdateAddressResponse } from './outputs/updateAddress.response';

@Resolver(() => AddressEntity)
export class UpdateAddressResolver {
  constructor(private readonly updateAddressUseCase: UpdateAddress) {}

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
