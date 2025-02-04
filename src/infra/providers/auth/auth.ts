import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from '../../../domain/contracts/base/baseMessages';
import { IHashProvider } from '../../../domain/contracts/providers/hash';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { LoginInput } from '../../graphql/resolvers/user/mutations/login/inputs/login.input';
import { AuthResponse } from '../../graphql/resolvers/user/mutations/login/outputs/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashGenerator: IHashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findOneByEmail(email);

    if (
      !user ||
      !(await this.hashGenerator.compareHash(password, user.password))
    ) {
      return new UnauthorizedException(ErrorMessages.invalidEmailOrPassword);
    }

    const token = await this.jwtService.signAsync({ sub: user.id });

    return {
      token,
      userId: user.id,
    };
  }
}
