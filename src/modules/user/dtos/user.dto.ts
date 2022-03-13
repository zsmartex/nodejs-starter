import { IsString } from 'amala';

export class UserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
