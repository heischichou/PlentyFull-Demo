export interface Header {
  key: string;
  label: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  bio: string | undefined;
  avatar: string | undefined;
  address: string;
  email: string;
  contact: string;
  proof: string | undefined;
  verified: boolean | undefined;
  token: string | undefined;
  createdAt: string;
  updatedAt: string | undefined;
}

export interface Notification {
  notificationId: string;
  senderId: string;
  senderName: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
  report: {
    type: object | undefined;
    default: undefined;
  };
}