import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';

@Injectable()
export class GetUserByEmail implements BaseUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<BaseResponse> {
    const data = await this.userRepository.findOneByEmail(email);

    if (!data) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    return data;
  }
}
