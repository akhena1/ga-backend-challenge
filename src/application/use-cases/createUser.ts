import { Injectable } from '@nestjs/common';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../domain/contracts/http/baseResponse';
import { IUserRepository } from '../../domain/contracts/repositories/userRepository.interface';
import { User } from '../../domain/entities/user';
import { IHashProvider } from '../../domain/contracts/providers/hash';

@Injectable()
export class CreateUser implements BaseUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashGenerator: IHashProvider,
  ) {}

  async execute(params: Partial<User>): Promise<BaseResponse> {
    const user = await this.userRepository.findOneByEmail(params.email);

    if (user) {
      return {
        message: ErrorMessages.userAlreadyExists,
      };
    }

    const hashedPassword = await this.hashGenerator.generateHash(
      params.password,
    );

    const newUserId = await this.userRepository.create({
      ...params,
      password: hashedPassword,
    });

    return {
      message: SuccessMessages.userCreated,
      data: { id: newUserId.id },
    };
  }
}
