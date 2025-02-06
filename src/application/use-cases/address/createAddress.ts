import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IAddressRepository } from '../../../domain/contracts/repositories/addressRepository.inteface';
import { Address } from '../../../domain/entities/address';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';

@Injectable()
export class CreateAddress implements BaseUseCase {
  constructor(
    private readonly addressRepository: IAddressRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: Address): Promise<BaseResponse> {
    const user = await this.userRepository.findOneById(params.userId);

    if (!user) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    const newAddress = await this.addressRepository.create({
      userId: params.userId,
      data: params,
    });

    return {
      message: SuccessMessages.addressCreated,
      data: { id: newAddress.id },
    };
  }
}
