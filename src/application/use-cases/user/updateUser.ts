import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { User } from '../../../domain/entities/user';

@Injectable()
export class UpdateUser implements BaseUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: {
    id: string;
    data: Partial<User>;
  }): Promise<BaseResponse> {
    const user = await this.userRepository.findOneById(params.id);

    if (!user) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    const updatedUser = await this.userRepository.updateUser(
      params.id,
      params.data,
    );

    return {
      message: SuccessMessages.userUpdated,
      data: updatedUser,
    };
  }
}
