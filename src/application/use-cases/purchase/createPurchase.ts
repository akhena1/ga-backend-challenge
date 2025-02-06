import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { IPurchaseRepository } from '../../../domain/contracts/repositories/purchaseRepository.interface';
import { Purchase } from '../../../domain/entities/purchase';

@Injectable()
export class CreatePurchase implements BaseUseCase {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: Purchase): Promise<BaseResponse> {
    const user = await this.userRepository.findOneById(params.userId);

    if (!user) {
      return new NotFoundException(ErrorMessages.userNotFound);
    }

    const newPurchase = await this.purchaseRepository.create({
      userId: params.userId,
      data: params,
    });

    return {
      message: SuccessMessages.purchaseCreated,
      data: { id: newPurchase.id },
    };
  }
}
