import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../../../entities/user.entity';
import { DeleteUser } from '../../../../../../application/use-cases/user/deleteUser';
import { DeleteUserResponse } from './outputs/deleteUser.response';
import { DeleteUserInput } from './inputs/deleteUser.input';

@Resolver(() => UserEntity)
export class DeleteUserResolver {
  constructor(private readonly deleteUserUseCase: DeleteUser) {}

  @Mutation(() => DeleteUserResponse)
  async deleteUser(@Args('deleteUserInput') params: DeleteUserInput) {
    try {
      return await this.deleteUserUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
