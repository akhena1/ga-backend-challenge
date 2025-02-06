import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteUser } from '../../../../../../application/use-cases/user/deleteUser';
import { JwtAuthGuard } from '../../../../../providers/auth/guards/jwtAuth.guard';
import { UserEntity } from '../../../../entities/user.entity';
import { DeleteUserInput } from './inputs/deleteUser.input';
import { DeleteUserResponse } from './outputs/deleteUser.response';

@Resolver(() => UserEntity)
export class DeleteUserResolver {
  constructor(private readonly deleteUserUseCase: DeleteUser) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeleteUserResponse)
  async deleteUser(@Args('deleteUserInput') params: DeleteUserInput) {
    try {
      return await this.deleteUserUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
