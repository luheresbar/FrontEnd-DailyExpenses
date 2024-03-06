import { UserProfile } from "./user.model";

export interface RoleDto {
  role: string,
  userId: UserProfile['userId'],
  grantedDate: string;
}