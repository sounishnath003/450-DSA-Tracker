import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/login-user.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { comparePasswords, encryptPlainPassword } from './utility-methods';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getAllUsers() {
    return await this.userRepo.getAllUsers();
  }

  async signupWithUsernamePassword(userDto: AuthDto) {
    try {
      const { username, password } = userDto;
      const isExists = await this.userRepo.findOne({ username });
      if (isExists)
        throw new NotAcceptableException(
          `${username} already exists!!. Please signin to your account!`,
        );
      const hashedPassword = encryptPlainPassword(password);
      const user = await this.userRepo.createUser({
        username,
        password: hashedPassword,
      });
      await user.save();

      const payload: JwtPayloadInterface = {
        sessionId: Date.now(),
        username,
      };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, accountActived: new Date().toTimeString() };
    } catch (error) {
      return error;
    }
  }

  async loginWithUsernamePassword(
    userDto: AuthDto,
    isCMSAdmin: boolean = false,
  ) {
    try {
      const { username, password } = userDto;
      const isExists = await this.userRepo.findOne({ username });
      if (!isExists)
        throw new NotFoundException(
          `${username} not found!!. Please create an account!`,
        );

      const { data, error } = await comparePasswords(
        password,
        isExists.password,
      );
      if (error || !data)
        throw new UnauthorizedException(`Username / Password is not correct!`);

      if (
        isCMSAdmin &&
        username !== `sounishnath003` &&
        isExists.username !== `sounishnath003`
      )
        throw new UnauthorizedException('You are not a Super User');

      const payload: JwtPayloadInterface = { sessionId: Date.now(), username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken, accountActived: new Date().toTimeString() };
    } catch (error: any) {
      return error;
    }
  }
}
