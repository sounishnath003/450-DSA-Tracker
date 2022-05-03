import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  password: string;
}
