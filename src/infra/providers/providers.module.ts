import { Global, Module } from '@nestjs/common';
import { IHashProvider } from '../..//domain/contracts/providers/hash';
import BCryptHashProvider from './hash/bcryptHashProvider';

@Global()
@Module({
  providers: [
    {
      provide: IHashProvider,
      useClass: BCryptHashProvider,
    },
  ],
  exports: [IHashProvider],
})
export class ProvidersModule {}
