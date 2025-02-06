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
import { DeleteUser } from '../../../src/application/use-cases/user/deleteUser';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Delete User', () => {
      let app: INestApplication;
      let deleteUserUseCase: DeleteUser;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            DeleteUser,
            { provide: IUserRepository, useValue: userRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        deleteUserUseCase = app.get(DeleteUser);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should delete a user when he exists', async () => {
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
        const usecase = await deleteUserUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(SuccessMessages.userDeleted);
      });

      it('Should throw an error when user do not exists', async () => {
        // Given
        const id = uuid();

        // When
        userRepositoryStub.findOneById.resolves(null);
        const usecase = await deleteUserUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});
