import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { GetPurchasesByUserId } from '../../../../src/application/use-cases/purchase/getPurchasesByUserId';
import { ErrorMessages } from '../../../../src/domain/contracts/base/baseMessages';
import { IPurchaseRepository } from '../../../../src/domain/contracts/repositories/purchaseRepository.interface';
import { IUserRepository } from '../../../../src/domain/contracts/repositories/userRepository.interface';
import { PurchaseRepository } from '../../../../src/infra/database/repository/purchase.repository';
import { UserRepository } from '../../../../src/infra/database/repository/user.repository';
import { PurchaseEntity } from '../../../../src/infra/graphql/entities/purchase.entity';
import { UserEntity } from '../../../../src/infra/graphql/entities/user.entity';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Get Purchases By User', () => {
      let app: INestApplication;
      let getPurchasesByUserUseCase: GetPurchasesByUserId;
      const purchasesRepositoryStub =
        sinon.createStubInstance(PurchaseRepository);

      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            GetPurchasesByUserId,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IPurchaseRepository, useValue: purchasesRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        getPurchasesByUserUseCase = app.get(GetPurchasesByUserId);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully return purchases when userId exists', async () => {
        // Given
        const id = uuid();
        const user: UserEntity = {
          id,
          email: 'teste@email.com',
          name: 'Nome',
          password: 'hashedPass',
        };

        const purchases: PurchaseEntity[] = [
          {
            id: '1',
            totalAmount: '190,90',
            purchaseDate: new Date('2025-02-06T07:10:06.089Z'),
          },
          {
            id: '2',
            totalAmount: '190,90',
            purchaseDate: new Date('2025-02-06T07:10:06.089Z'),
          },
        ] as PurchaseEntity[];

        // When
        userRepositoryStub.findOneById.resolves(user);
        purchasesRepositoryStub.findByUserId.resolves(purchases);
        const usecase = await getPurchasesByUserUseCase.execute(id);

        // Then
        expect(usecase).toBe(purchases);
      });

      it('Should return error when userId does not exists', async () => {
        // Given
        const id = '123';

        // When
        userRepositoryStub.findOneById.resolves(false);
        const usecase = await getPurchasesByUserUseCase.execute(id);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });

      it('Should return an empty array when user does not have any purchases', async () => {
        // Given
        const id = uuid();
        const user: UserEntity = {
          id,
          email: 'teste@email.com',
          name: 'Nome',
          password: 'hashedPass',
        };
        const purchases = [];
        // When
        userRepositoryStub.findOneById.resolves(user);
        purchasesRepositoryStub.findByUserId.resolves(purchases);
        const usecase = await getPurchasesByUserUseCase.execute(id);

        // Then
        expect(usecase).toBe(purchases);
      });
    });
  });
});
