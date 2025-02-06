import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IAddressRepository } from '../../../domain/contracts/repositories/addressRepository.inteface';
import { Address } from '../../../domain/entities/address';

@Injectable()
export class UpdateAddress implements BaseUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(params: {
    id: string;
    data: Partial<Address>;
  }): Promise<BaseResponse> {
    const address = await this.addressRepository.findOneById(params.id);

    if (!address) {
      return new NotFoundException(ErrorMessages.addressNotFound);
    }

    const updatedAddress = await this.addressRepository.updateAddress(
      params.id,
      params.data,
    );

    return {
      message: SuccessMessages.addressUpdated,
      data: updatedAddress,
    };
  }
}
