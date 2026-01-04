export interface UserProfileModel {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDay: Date;
}

export interface UserNotificationProfileModel {
  id: string;
  userId: string;
  enableEmail: boolean;
  enableSignalR: boolean;
  email: string;
  createdDate: Date;
}

export interface UpdatedUserNotificationProfileModel {
  id: string;
  userId: string;
  enableEmail: boolean;
  enableSignalR: boolean;
}

export interface UpdateUserProfileModel {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userName?: string;
}
