export abstract class IPurchaseRepository<T = any> {
    abstract create(params: any): Promise<{ id: string }>;
    abstract findByUserId(id: string): Promise<T>;
    abstract findOneById?(id: string): Promise<T>;
    abstract deletePurchase(id: string): any;
  }
  