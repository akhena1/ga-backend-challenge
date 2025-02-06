import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { DeleteResult, Repository } from 'typeorm';
import { IPurchaseRepository } from '../../../domain/contracts/repositories/purchaseRepository.interface';
import { PurchaseEntity } from '../../graphql/entities/purchase.entity';
import { UserEntity } from '../../graphql/entities/user.entity';

@Injectable()
export class PurchaseRepository
  implements IPurchaseRepository<PurchaseEntity | PurchaseEntity[]>
{
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly repository: Repository<PurchaseEntity>,
  ) {}

  async create(params: {
    userId: string;
    data: PurchaseEntity;
  }): Promise<{ id: string }> {
    const newPurchaseQuery = this.repository.create({
      ...params.data,
      user: { id: params.userId } as UserEntity,
    });

    return await this.repository.save(newPurchaseQuery);
  }

  async findByUserId(id: string): Promise<PurchaseEntity[]> {
    const purchases = await this.repository.findBy({
      user: { id },
    });
    const plainPurchases = instanceToPlain(purchases);

    return plainPurchases as PurchaseEntity[];
  }

  async findOneById(id: string): Promise<PurchaseEntity | PurchaseEntity[]> {
    return await this.repository.findOneBy({ id });
  }


  async deletePurchase(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }
}
