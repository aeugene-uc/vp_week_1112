
export interface RestaurantCreateRequest {
  name: string;
  description: string;
  isOpen: boolean;
}

export type RestaurantUpdateRequest = Partial<RestaurantCreateRequest>;