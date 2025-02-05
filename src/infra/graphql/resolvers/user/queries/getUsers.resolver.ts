import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../../entities/user.entity';
import { GetUsers } from 'src/application/use-cases/user/getUsers';
import { GetUserByEmail } from 'src/application/use-cases/user/getUserByEmail';

@Resolver(() => UserEntity)
export class UserQuery {
  constructor(
    private readonly getUsersUseCase: GetUsers,
    private readonly getUserByEmailUseCase: GetUserByEmail,
  ) {}

  @Query(() => [UserEntity])
  async getUsers() {
    return await this.getUsersUseCase.execute();
  }

  @Query(() => UserEntity)
  async getUserByEmail(@Args('email') email: string) {
    return await this.getUserByEmailUseCase.execute(email);
  }
}
