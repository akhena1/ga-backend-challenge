export abstract class IAddressRepository<T = any> {
  abstract create(params: any): Promise<{ id: string }>;
  abstract findByUserId(id: string): Promise<T>;
  abstract findOneById?(id: string): Promise<T>;
  abstract updateAddress(id: string, data: Partial<T>): any;
  abstract deleteAddress(id: string): any;
}
