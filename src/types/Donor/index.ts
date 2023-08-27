export interface FoodItem {
  itemId: string;
  name: string;
  type: string;
  stage: string;
  quantity: number;
  weight: number;
  createdAt: string;
  updatedAt: string | undefined;
}

export interface Queuer {
  queuerId: string;
  charityId: string;
  name: string;
  status: string;
  queuePos: number;
  queueWeight: string;
  distance: number;
  donationsReceived: number;
  createdAt: string;
  updatedAt: string;
}