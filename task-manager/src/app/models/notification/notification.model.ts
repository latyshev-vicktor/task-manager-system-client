import { BaseModel } from '../base.model';

export interface NotificationModel {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  userId: number;
  createdDate: Date;
}



