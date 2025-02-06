export abstract class IAddressRepository<T = any> {
  abstract create(params: Partial<T>): Promise<{ id: string }>;
  abstract findOneByUserId(id: string): Promise<T>;
  abstract findOneById?(id: string): Promise<T>;
  abstract findAll(): Promise<T>;
  abstract updateAddress(id: string, data: Partial<T>): any;
  abstract deleteAddress(id: string): any;
}
