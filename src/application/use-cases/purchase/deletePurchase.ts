import { Injectable, NotFoundException } from '@nestjs/common';
import {
    ErrorMessages,
    SuccessMessages,
} from '../../../domain/contracts/base/baseMessages';
import { BaseUseCase } from '../../../domain/contracts/base/baseUseCase';
import { BaseResponse } from '../../../domain/contracts/http/baseResponse';
import { IPurchaseRepository } from '../../../domain/contracts/repositories/purchaseRepository.interface';

@Injectable()
export class DeletePurchase implements BaseUseCase {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(params: { id: string }): Promise<BaseResponse> {
    const purchase = await this.purchaseRepository.findOneById(params.id);

    if (!purchase) {
      return new NotFoundException(ErrorMessages.purchaseNotFound);
    }

    const deletedPurchase = await this.purchaseRepository.deletePurchase(params.id);

    return {
      message: SuccessMessages.purchaseDeleted,
      data: deletedPurchase,
    };
  }
}
