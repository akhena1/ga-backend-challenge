import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUser } from '../../../../application/use-cases/user/createUser';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserResolver } from './mutations/createUser/createUser.resolver';
import { UserQuery } from './queries/usersQuery.resolver';
import { GetUsers } from '../../../../application/use-cases/user/getUsers';
import { GetUserByEmail } from '../../../../application/use-cases/user/getUserByEmail';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserResolver } from './mutations/updateUsers/updateUser.resolver';
import { UpdateUser } from '../../../../application/use-cases/user/updateUser';
import { DeleteUserResolver } from './mutations/deleteUser/deleteUser.resolver';
import { DeleteUser } from '../../../../application/use-cases/user/deleteUser';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    CreateUserResolver,
    UpdateUserResolver,
    DeleteUserResolver,
    UserQuery,
    CreateUser,
    UpdateUser,
    DeleteUser,
    GetUsers,
    GetUserByEmail,
    UserRepository,
    JwtService,
  ],
})
export class UserModule {}
