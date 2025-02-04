import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../../../../providers/auth/auth';
import { LoginInput } from './inputs/login.input';
import { AuthResponse } from './outputs/auth.response';

@Resolver()
export class LoginResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
