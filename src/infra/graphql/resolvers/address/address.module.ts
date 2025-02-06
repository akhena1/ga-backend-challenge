import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAddress } from '../../../../application/use-cases/address/createAddress';
import { DeleteAddress } from '../../../../application/use-cases/address/deleteAddress';
import { GetAddressesByUserId } from '../../../../application/use-cases/address/getAddressByUserId';
import { UpdateAddress } from '../../../../application/use-cases/address/updateAddress';
import { IAddressRepository } from '../../../../domain/contracts/repositories/addressRepository.inteface';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { AddressRepository } from '../../../database/repository/address.repository';
import { UserRepository } from '../../../database/repository/user.repository';
import { AddressEntity } from '../../entities/address.entity';
import { UserEntity } from '../../entities/user.entity';
import { CreateAddressResolver } from './mutations/createAddress/createAddress.resolver';
import { DeleteAddressResolver } from './mutations/deleteAddress/deleteAddress.resolver';
import { UpdateAddressResolver } from './mutations/updateAddress/updateAddress.resolver';
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
    UpdateAddressResolver,
    DeleteAddressResolver,
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    GetAddressesByUserId,
    JwtService,
  ],
})
export class AddressModule {}
