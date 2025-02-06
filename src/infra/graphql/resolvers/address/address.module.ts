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
import { UpdateAddressResolver } from './mutations/updateAddress/updateAddress.resolver';
import { UpdateAddress } from '../../../../application/use-cases/address/updateAddress';
import { DeleteAddress } from '../../../../application/use-cases/address/deleteAddress';
import { DeleteAddressResolver } from './mutations/deleteAddress/deleteAddress.resolver';

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
    UpdateAddressResolver,
    DeleteAddressResolver,
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    GetAddressesByUserId,
  ],
})
export class AddressModule {}
