import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../../entities/user.entity';
import { UserRepository } from '../../../../database/repository/user.repository';

@Resolver(() => UserEntity)
export class UserQuery {
  constructor(private userProvider: UserRepository) {}

  @Query(() => UserEntity)
  async getUser(@Args('email') email: string) {
    return this.userProvider.findOneByEmail(email);
  }
}
