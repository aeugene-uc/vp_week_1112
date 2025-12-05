
export interface CustomerCreateRequest {
  name: string;
  phone: string;
}

export type CustomerUpdateRequest = Partial<CustomerCreateRequest>;