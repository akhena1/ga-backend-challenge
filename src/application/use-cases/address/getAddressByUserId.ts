import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IAddressRepository } from '../../../domain/contracts/repositories/addressRepository.inteface';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';

@Injectable()
export class GetAddressesByUserId implements BaseUseCase {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<BaseResponse> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    return await this.addressRepository.findByUserId(userId);
  }
}
