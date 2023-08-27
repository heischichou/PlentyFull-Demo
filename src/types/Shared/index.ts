import { FoodItem } from "../Donor";

export interface Transaction {
  transactionId: string;
  donorName: string;
  donorAvatar: string;
  charityName: string;
  charityAvatar: string;
  distance: number;
  deliveryMode: string;
  status: string;
  deliveryNotes: string;
  optionalNotes: string;
  donations: FoodItem[];
  createdAt: string;
  updatedAt: string;
}