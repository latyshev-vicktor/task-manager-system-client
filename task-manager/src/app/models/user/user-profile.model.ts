export interface UserProfileModel {
  userId: string;
  createdDate: Date;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
}

export interface NotificationSettingsModel {
  userId: string;
  emailEnabled: boolean;
  signalREnabled: boolean;
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskUpdated: boolean;
  sprintCreated: boolean;
  sprintUpdated: boolean;
  commentAdded: boolean;
}

