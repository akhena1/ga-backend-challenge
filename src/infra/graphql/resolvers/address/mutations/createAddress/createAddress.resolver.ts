import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressEntity } from '../../../../entities/address.entity';
import { CreateAddressResponse } from './outputs/createAddress.response';
import { CreateAddressInput } from './inputs/createAddress.input';
import { CreateAddress } from '../../../../../../application/use-cases/address/createAddress';

@Resolver(() => AddressEntity)
export class CreateAddressResolver {
  constructor(private readonly createAddressUseCase: CreateAddress) {}

  @Mutation(() => CreateAddressResponse)
  async createAddress(@Args('createAddressInput') params: CreateAddressInput) {
    try {
      return await this.createAddressUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
