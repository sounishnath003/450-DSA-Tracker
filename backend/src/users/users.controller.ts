import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get('/all')
  async getUser() {
    return await this.userService.getAllUsers();
  }
}
