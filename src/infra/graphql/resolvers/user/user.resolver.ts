import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../entities/user.entity';
import { UserProvider } from '../../../repository/user.repository';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userProvider: UserProvider) {}

  @Query(() => UserEntity)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userProvider.findOneById(id);
  }
}
