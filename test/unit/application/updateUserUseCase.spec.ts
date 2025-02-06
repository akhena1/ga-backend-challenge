import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../src/domain/contracts/base/baseMessages';
import { IUserRepository } from '../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../src/infra/graphql/entities/user.entity';
import { UpdateUser } from '../../../src/application/use-cases/user/updateUser';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Update User', () => {
      let app: INestApplication;
      let updateUserUseCase: UpdateUser;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            UpdateUser,
            { provide: IUserRepository, useValue: userRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        updateUserUseCase = app.get(UpdateUser);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should update a user when he exists', async () => {
        // Given
        const id = uuid();
        const params: Partial<UserEntity> = {
          id,
          email: 'teste@gmail.com',
          name: 'Zézé',
        };

        // When
        userRepositoryStub.findOneById.resolves(params);
        userRepositoryStub.updateUser.resolves(true);
        const usecase = await updateUserUseCase.execute({ id, data: params });

        // Then
        expect(usecase.message).toBe(SuccessMessages.userUpdated);
      });

      it('Should throw an error when user do not exists', async () => {
        // Given
        const id = uuid();
        const params: Partial<UserEntity> = {
          id,
          email: 'teste@gmail.com',
          name: 'Zézé',
        };

        // When
        userRepositoryStub.findOneById.resolves(null);
        const usecase = await updateUserUseCase.execute({ id, data: params });

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});
