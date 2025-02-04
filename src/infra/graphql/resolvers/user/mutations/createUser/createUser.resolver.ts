import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUser } from '../../../../../../application/use-cases/user/createUser';
import { UserEntity } from '../../../../entities/user.entity';
import { CreateUserInput } from './inputs/createUser.input';
import { CreateUserResponse } from './outputs/createUserResponse';

@Resolver(() => UserEntity)
export class CreateUserResolver {
  constructor(private readonly createUserUseCase: CreateUser) {}

  @Mutation(() => CreateUserResponse)
  async createUser(@Args('createUserInput') params: CreateUserInput) {
    try {
      return await this.createUserUseCase.execute(params);
    } catch (error) {
      throw error;
    }
  }
}
