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

export interface LoginUserDTO extends Pick<UserProfile, 'email' | 'password' > {}

export interface UpdateUserDto extends Omit<UserProfile, 'registerDate' | 'roles' > {
}
export interface UpdatePasswordDto {
  currentPassword: UserProfile['password'];
  newPassword:  UserProfile['password'];
}

export interface UserEmail extends Pick<UserProfile, 'email'> {
}
