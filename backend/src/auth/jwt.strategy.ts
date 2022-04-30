import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User, UserDocument } from './user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private configService: ConfigService,
    private readonly userRepo: UserRepository,
  ) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const { username, sessionId } = payload;
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new UnauthorizedException();
    return {
      _id: user._id,
      id: user.id,
      username: user.username,
    };
  }
}
