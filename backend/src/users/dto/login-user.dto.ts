import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  password: string;
}
