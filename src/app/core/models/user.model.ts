import { RoleDto } from "./roleDto.model";

export interface UserProfile {
  userId: number;
  username: string;
  password: string;
  email: string;
  registerDate: string;
  roles: RoleDto[];
}

export interface UserResponse extends Omit<UserProfile, 'password'> {}

export interface RegisterUserDTO extends Omit<UserProfile, 'registerDate' | 'userId' | 'roles'> {}

export interface LoginUserDTO extends Omit<UserProfile, 'username' | 'registerDate' | 'userId' | 'roles' > {}

export interface UpdateUserDto extends Omit<UserProfile, 'registerDate' | 'roles' > {
}
export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UserEmail {
  email: string;
}
