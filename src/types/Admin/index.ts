export interface Account {
  id: string;
  name: string;
  type: string;
  bio: string | undefined;
  address: string;
  email: string;
  contact: string;
  proof: string | undefined;
  verified: boolean | undefined;
  token: string | undefined;
  createdAt: string;
  updatedAt: string | undefined;
}

export interface Report {
  notificationId: string;
  reportId: string;
  senderId: string;
  violatorId: string;
  type: string;
  subject: string;
  message: string;
  violatorName: string;
  reporterName: string;
  reportType: string;
  resolved: boolean;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}