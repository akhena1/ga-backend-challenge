import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { ErrorMessages } from '../../../src/domain/contracts/base/baseMessages';
import { IHashProvider } from '../../../src/domain/contracts/providers/hash';
import { IUserRepository } from '../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../src/infra/graphql/entities/user.entity';
import { AuthService } from '../../../src/infra/providers/auth/auth';
import BCryptHashProvider from '../../../src/infra/providers/hash/bcryptHashProvider';

describe('Unit tests', () => {
  describe('Auth', () => {
    describe('Login User', () => {
      let app: INestApplication;
      let authService: AuthService;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);
      const hashProviderStub =
        sinon.createStubInstance<IHashProvider>(BCryptHashProvider);
      const jwtProviderStub = sinon.createStubInstance(JwtService);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            AuthService,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IHashProvider, useValue: hashProviderStub },
            { provide: JwtService, useValue: jwtProviderStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        authService = app.get(AuthService);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should log in when credentials are correct', async () => {
        // Given
        const id = uuid();
        const email = 'teste@gmail.com';
        const password = 'SenhaForte012';
        const hashedPassword = bcrypt.hash(password, 10);
        const user: UserEntity = {
          id,
          email,
          password: hashedPassword,
          name: 'Teste',
        };
        const token = 'jwt-token-123';

        // When
        userRepositoryStub.findOneByEmail.resolves(user);
        hashProviderStub.compareHash.resolves(true);
        jwtProviderStub.signAsync.resolves(token);

        const usecase = await authService.login({ email, password });

        // Then
        expect(usecase).toHaveProperty('token', token);
        expect(usecase).toHaveProperty('userId', id);
      });

      it('Should fail if password is incorrect', async () => {
        // Given
        const email = 'teste@gmail.com';
        const user: UserEntity = {
          id: uuid(),
          email,
          password: 'hashedPassword123',
          name: 'Teste',
        };

        userRepositoryStub.findOneByEmail.resolves(user);
        hashProviderStub.compareHash.resolves(false); // Senha errada

        // When
        const usecase = await authService.login({
          email,
          password: 'wrongpass',
        });

        // Then
        expect(usecase.message).toBe(ErrorMessages.invalidEmailOrPassword);
      });

      it('Should generate a valid token when login is successful', async () => {
        // Given
        const email = 'teste@gmail.com';
        const password = 'SenhaForte012';
        const hashedPassword = 'hashedPassword123';
        const user: UserEntity = {
          id: uuid(),
          email,
          password: hashedPassword,
          name: 'Teste',
        };
        const token = 'jwt-token-123';

        userRepositoryStub.findOneByEmail.resolves(user);
        hashProviderStub.compareHash.resolves(true);

        // When
        const usecase = await authService.login({ email, password });

        // Then
        expect(usecase).toHaveProperty('token', token);
        expect(jwtProviderStub.signAsync.called).toBe(true);
      });
    });
  });
});
