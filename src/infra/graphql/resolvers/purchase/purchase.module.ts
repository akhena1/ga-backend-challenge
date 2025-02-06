import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePurchase } from '../../../../application/use-cases/purchase/createPurchase';
import { DeletePurchase } from '../../../../application/use-cases/purchase/deletePurchase';
import { GetPurchasesByUserId } from '../../../../application/use-cases/purchase/getPurchasesByUserId';
import { IPurchaseRepository } from '../../../../domain/contracts/repositories/purchaseRepository.interface';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { PurchaseRepository } from '../../../database/repository/purchase.repository';
import { UserRepository } from '../../../database/repository/user.repository';
import { PurchaseEntity } from '../../entities/purchase.entity';
import { UserEntity } from '../../entities/user.entity';
import { CreatePurchaseResolver } from './mutations/createPurchase/createPurchase.resolver';
import { DeletePurchaseResolver } from './mutations/deletePurchase/deletePurchase.resolver';
import { PurchaseQueryResolver } from './queries/purchaseQuery.resolver';

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
    DeletePurchaseResolver,
    CreatePurchase,
    GetPurchasesByUserId,
    DeletePurchase,
    JwtService,
  ],
})
export class PurchaseModule {}
