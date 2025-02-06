import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetUserByEmail } from '../../../../../application/use-cases/user/getUserByEmail';
import { GetUsers } from '../../../../../application/use-cases/user/getUsers';
import { JwtAuthGuard } from '../../../../providers/auth/guards/jwtAuth.guard';
import { UserEntity } from '../../../entities/user.entity';

@Resolver(() => UserEntity)
export class UserQuery {
  constructor(
    private readonly getUsersUseCase: GetUsers,
    private readonly getUserByEmailUseCase: GetUserByEmail,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEntity])
  async getUsers() {
    return await this.getUsersUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getUserByEmail(@Args('email') email: string) {
    return await this.getUserByEmailUseCase.execute(email);
  }
}
