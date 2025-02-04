import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../../../../database/repository/user.repository';
import { UserEntity } from '../../../entities/user.entity';

@Resolver(() => UserEntity)
export class UserQuery {
  constructor(private userProvider: UserRepository) {}

  @Query(() => UserEntity)
  async getUser(@Args('email') email: string) {
    return this.userProvider.findOneByEmail(email);
  }
}
