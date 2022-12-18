export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
  address: string;
  birthday: Date;
  roleId: any;
  isFullPermission: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
