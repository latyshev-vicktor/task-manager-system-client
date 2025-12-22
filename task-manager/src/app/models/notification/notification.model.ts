import { BaseModel } from '../base.model';

export interface NotificationModel extends BaseModel {
  title: string;
  message: string;
  isRead: boolean;
  userId: number;
  createdDate: Date;
}

