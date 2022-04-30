import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { SolutionModule } from './solution/solution.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      encoding: ' utf-8',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return { uri: configService.get('mongodbDev') };
      },
    }),
    AuthModule,
    QuestionsModule,
    SolutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
