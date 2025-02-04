import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from 'src/infra/database/repository/user.repository';
import { UserEntity } from 'src/infra/graphql/entities/user.entity';
import { LoginResolver } from 'src/infra/graphql/resolvers/user/mutations/login/login.resolver';
import { AuthService } from './auth';

@Module({
  imports: [
    JwtModule.register({
      secret: 'default_secret',
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    UserRepository,
    LoginResolver,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
