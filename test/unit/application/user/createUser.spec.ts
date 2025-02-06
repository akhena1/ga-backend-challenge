import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { CreateUser } from '../../../../src/application/use-cases/user/createUser';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { IHashProvider } from '../../../../src/domain/contracts/providers/hash';
import { IUserRepository } from '../../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../../src/infra/graphql/entities/user.entity';
import BCryptHashProvider from '../../../../src/infra/providers/hash/bcryptHashProvider';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Create User', () => {
      let app: INestApplication;
      let createUserUseCase: CreateUser;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);
      const hashProviderStub =
        sinon.createStubInstance<IHashProvider>(BCryptHashProvider);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            CreateUser,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IHashProvider, useValue: hashProviderStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        createUserUseCase = app.get(CreateUser);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should create a user when params is valid', async () => {
        // Given
        const id = uuid();
        const password = 'SenhaForte012';
        const params: UserEntity = {
          id,
          email: 'teste@gmail.com',
          password,
          name: 'Zézé',
        };
        const hashedPassword = hash(password, 10);

        // When
        userRepositoryStub.findOneByEmail.resolves(undefined);
        hashProviderStub.generateHash.resolves(hashedPassword);
        userRepositoryStub.create.resolves({ id });
        const usecase = await createUserUseCase.execute(params);

        // Then
        expect(usecase.message).toBe(SuccessMessages.userCreated);
        expect(usecase.data).toHaveProperty('id');
        expect(usecase.data.id).toBe(id);
      });

      it('Should not create a user when email already exists in database', async () => {
        // Given
        const id = uuid();
        const params: UserEntity = {
          id,
          email: 'teste@gmail.com',
          password: 'SenhaForte012',
          name: 'Zézé',
        };

        // When
        userRepositoryStub.findOneByEmail.resolves(params);
        const usecase = await createUserUseCase.execute(params);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userAlreadyExists);
      });
    });
  });
});
