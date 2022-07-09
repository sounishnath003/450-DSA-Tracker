import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/login-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/all')
  async getUser() {
    return await this.authService.getAllUsers();
  }

  @Post('signup')
  async signin(@Body() userDto: AuthDto) {
    return await this.authService.signupWithUsernamePassword(userDto);
  }

  @Post('login')
  async login(@Body() userDto: AuthDto) {
    return await this.authService.loginWithUsernamePassword(userDto);
  }

  @Post('cms-login')
  async cmslogin(@Body() userDto: AuthDto) {
    return await this.authService.loginWithUsernamePassword(userDto, true);
  }

  @Get('is-loggedIn')
  @UseGuards(AuthGuard('jwt'))
  async isLoggedIn(@GetUser() user: User) {
    return {};
  }
}
