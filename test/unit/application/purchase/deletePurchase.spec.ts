import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { DeletePurchase } from '../../../../src/application/use-cases/purchase/deletePurchase';
import {
    ErrorMessages,
    SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { IPurchaseRepository } from '../../../../src/domain/contracts/repositories/purchaseRepository.interface';
import { PurchaseRepository } from '../../../../src/infra/database/repository/purchase.repository';
import { PurchaseEntity } from '../../../../src/infra/graphql/entities/purchase.entity';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Delete Purchase', () => {
      let app: INestApplication;
      let deletePurchaseUseCase: DeletePurchase;
      const purchaseRepositoryStub =
        sinon.createStubInstance(PurchaseRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            DeletePurchase,
            { provide: IPurchaseRepository, useValue: purchaseRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        deletePurchaseUseCase = app.get(DeletePurchase);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should delete a purchase when it exists', async () => {
        // Given
        const id = uuid();
        const purchase = {
          id,
          purchaseDate: new Date(),
          totalAmount: '190.90',
        } as PurchaseEntity;

        // When
        purchaseRepositoryStub.findOneById.resolves(purchase);
        const usecase = await deletePurchaseUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(SuccessMessages.purchaseDeleted);
      });

      it('Should throw an error when purchase do not exists', async () => {
        // Given
        const id = uuid();

        // When
        purchaseRepositoryStub.findOneById.resolves(null);
        const usecase = await deletePurchaseUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(ErrorMessages.purchaseNotFound);
      });
    });
  });
});
