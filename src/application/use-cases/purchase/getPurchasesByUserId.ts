import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { IPurchaseRepository } from '../../../domain/contracts/repositories/purchaseRepository.interface';

@Injectable()
export class GetPurchasesByUserId implements BaseUseCase {
  constructor(
    private readonly purchasesRepository: IPurchaseRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<BaseResponse> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    return await this.purchasesRepository.findByUserId(userId);
  }
}
