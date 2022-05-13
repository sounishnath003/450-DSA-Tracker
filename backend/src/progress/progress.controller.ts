import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ProgressService } from './progress.service';

@UseGuards(AuthGuard('jwt'))
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
  @Get('track')
  async track(@GetUser() user: any) {
    return await this.progressService.progress(user.id);
  }
}
