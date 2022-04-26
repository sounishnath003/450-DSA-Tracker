import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}
  async getAllUsers() {
    return await this.userRepo.getAllUsers();
  }
}
