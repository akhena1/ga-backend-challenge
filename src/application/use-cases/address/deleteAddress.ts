import { Injectable, NotFoundException } from '@nestjs/common';
import {
    ErrorMessages,
    SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IAddressRepository } from '../../../domain/contracts/repositories/addressRepository.inteface';

@Injectable()
export class DeleteAddress implements BaseUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(params: { id: string }): Promise<BaseResponse> {
    const address = await this.addressRepository.findOneById(params.id);

    if (!address) {
      return new NotFoundException(ErrorMessages.addressNotFound);
    }

    const updatedAddress = await this.addressRepository.deleteAddress(params.id);

    return {
      message: SuccessMessages.addressDeleted,
      data: updatedAddress,
    };
  }
}
