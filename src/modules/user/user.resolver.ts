import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserProvider } from './providers/user.provider';

@Resolver(() => User)
export class UserResolver {
  constructor(private userProvider: UserProvider) {}

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userProvider.findOneById(id);
  }
}
