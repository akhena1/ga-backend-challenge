import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IPurchaseRepository } from '../../../../domain/contracts/repositories/purchaseRepository.interface';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { PurchaseRepository } from '../../../database/repository/purchase.repository';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { PurchaseEntity } from '../../entities/purchase.entity';
import { CreatePurchase } from '../../../../application/use-cases/purchase/createPurchase';
import { CreatePurchaseResolver } from './mutations/createPurchase/createPurchase.resolver';
import { PurchaseQueryResolver } from './queries/purchaseQuery.resolver';
import { GetPurchasesByUserId } from '../../../../application/use-cases/purchase/getPurchasesByUserId';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseEntity, UserEntity])],
  providers: [
    {
      provide: IPurchaseRepository,
      useClass: PurchaseRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    CreatePurchaseResolver,
    PurchaseQueryResolver,
    CreatePurchase,
    GetPurchasesByUserId
  ],
})
export class PurchaseModule {}
