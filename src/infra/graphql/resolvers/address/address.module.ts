import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IAddressRepository } from '../../../../domain/contracts/repositories/addressRepository.inteface';
import { AddressRepository } from '../../../database/repository/address.repository';
import { AddressEntity } from '../../entities/address.entity';
import { CreateAddressResolver } from './mutations/createAddress/createAddress.resolver';
import { CreateAddress } from '../../../../application/use-cases/address/createAddress';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { GetAddressesByUserId } from '../../../../application/use-cases/address/getAddressByUserId';
import { AddressQueryResolver } from './queries/addressQuery.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  providers: [
    {
      provide: IAddressRepository,
      useClass: AddressRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    CreateAddressResolver,
    AddressQueryResolver,
    CreateAddress,
    GetAddressesByUserId
  ],
})
export class AddressModule {}
