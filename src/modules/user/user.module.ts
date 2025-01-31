import { Module } from '@nestjs/common';
import { UserProvider } from './providers/user.provider';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserProvider, UserResolver],
})
export class UserModule {}
