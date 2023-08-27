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