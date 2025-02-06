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
    CreatePurchase
  ],
})
export class PurchaseModule {}
