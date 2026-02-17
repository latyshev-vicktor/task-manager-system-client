export interface UserProfileModel {
  id: string;
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
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userName?: string;
}
