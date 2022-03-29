import { IsString } from 'amala';

export class UserLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
