import { Merchant } from "@merchants/domain/entities/merchant";

export class PaginatedMerchants {
  constructor(
    public readonly merchants: Merchant[],
    public readonly total: number,
  ) { }
}