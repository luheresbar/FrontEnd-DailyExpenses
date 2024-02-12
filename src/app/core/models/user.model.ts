import { RoleDto } from "./roleDto.model";

export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  registerDate: string;
  roles: RoleDto[];
}

export interface UserResponse extends Omit<User, 'password'> {}

export interface RegisterUserDTO extends Omit<User, 'registerDate' | 'userId' | 'roles'> {}

export interface LoginUserDTO extends Omit<User, 'username' | 'registerDate' | 'userId' | 'roles' > {}
