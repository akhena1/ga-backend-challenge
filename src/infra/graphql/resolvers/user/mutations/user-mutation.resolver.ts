import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../../entities/user.entity';
import { CreateUser } from '../../../../../application/use-cases/createUser';
import { CreateUserInput } from './inputs/createUserInput';
import { CreateUserResponse } from './outputs/createUserResponse';

@Resolver(() => UserEntity)
export class UserMutation {
  constructor(private readonly createUserUseCase: CreateUser) {}

  @Mutation(() => CreateUserResponse)
  async createUser(@Args('createUserInput') params: CreateUserInput) {
    return await this.createUserUseCase.execute(params);
  }
}
