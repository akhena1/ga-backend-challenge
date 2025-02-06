import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { CreatePurchase } from '../../../../src/application/use-cases/purchase/createPurchase';
import {
    ErrorMessages,
    SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { IPurchaseRepository } from '../../../../src/domain/contracts/repositories/purchaseRepository.interface';
import { IUserRepository } from '../../../../src/domain/contracts/repositories/userRepository.interface';
import { PurchaseRepository } from '../../../../src/infra/database/repository/purchase.repository';
import { UserRepository } from '../../../../src/infra/database/repository/user.repository';
import { CreatePurchaseInput } from '../../../../src/infra/graphql/resolvers/purchase/mutations/createPurchase/inputs/createPurchase.input';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Create Purchase', () => {
      let app: INestApplication;
      let createPurchaseUseCase: CreatePurchase;
      const purchaseRepositoryStub = sinon.createStubInstance(PurchaseRepository);
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            CreatePurchase,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IPurchaseRepository, useValue: purchaseRepositoryStub },

          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        createPurchaseUseCase = app.get(CreatePurchase);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully create a purchase', async () => {
        // Given
        const purchaseId = uuid();
        const userId = uuid()
        const purchase: CreatePurchaseInput = {
           totalAmount: "199.90",
           userId
        };

        // When
        userRepositoryStub.findOneById.resolves(true);
        purchaseRepositoryStub.create.resolves({ id: purchaseId })
        const usecase = await createPurchaseUseCase.execute(purchase);

        // Then
        expect(usecase.message).toBe(SuccessMessages.purchaseCreated);
        expect(usecase.data).toHaveProperty('id');
        expect(usecase.data.id).toBe(purchaseId);
      });

      it('Should throw an error when userId does not exists', async () => {
        // Given
        const purchaseId = uuid();
        const userId = uuid()
        const purchase: CreatePurchaseInput = {
            totalAmount: "199.90",
            userId
         };

        // When
        userRepositoryStub.findOneById.resolves(false);
        purchaseRepositoryStub.create.resolves({ id: purchaseId })
        const usecase = await createPurchaseUseCase.execute(purchase);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});
