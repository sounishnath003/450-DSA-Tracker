import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  password: string;
}
