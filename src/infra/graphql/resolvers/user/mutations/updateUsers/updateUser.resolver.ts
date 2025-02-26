import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/infra/providers/auth/guards/jwtAuth.guard';
import { UpdateUser } from '../../../../../../application/use-cases/user/updateUser';
import { UserEntity } from '../../../../entities/user.entity';
import { UpdateUserInput } from './inputs/updateUser.input';
import { UpdateUserResponse } from './outputs/updateUser.response';

@Resolver(() => UserEntity)
export class UpdateUserResolver {
  constructor(private readonly updateUserUseCase: UpdateUser) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UpdateUserResponse)
  async updateUser(@Args('updateUserInput') params: UpdateUserInput) {
    try {
      return await this.updateUserUseCase.execute({
        id: params.id,
        data: params.data,
      });
    } catch (error) {
      throw error;
    }
  }
}
