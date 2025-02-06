import { Args, Query, Resolver } from '@nestjs/graphql';
import { AddressEntity } from '../../../entities/address.entity';
import { GetAddressesByUserId } from '../../../../../application/use-cases/address/getAddressByUserId';

@Resolver(() => AddressEntity)
export class AddressQueryResolver {
  constructor(
    private readonly getAddressesByUserIdUseCase: GetAddressesByUserId,
  ) {}

  @Query(() => [AddressEntity])
  async getAddressesByUserId(@Args('userId') userId: string) {
    return await this.getAddressesByUserIdUseCase.execute(userId);
  }
}
