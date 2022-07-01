import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import {
  BAllTopicQuestion,
  BAllTopicQuestionSchema,
} from './migration/schema/alltopicquestions.schema';
import { BUser, BUserSchema } from './migration/schema/user.schema';
import { MigrateService } from './migration/services/migration.service';
import { ProgressModule } from './progress/progress.module';
import { QuestionsModule } from './questions/questions.module';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      encoding: ' utf-8',
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log({ configService });
    //     return {
    //       uri: configService.get('mongodbProd'),
    //       connectionName: 'MIGRATION_PROD',
    //     };
    //   },
    // }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     return { uri: configService.get('mongodbDev') };
    //   },
    // }),
    MongooseModule.forRoot(configuration().mongodbProd, {
      connectionName: 'PROD',
    }),
    MongooseModule.forRoot(configuration().mongodbMigrationProd, {
      connectionName: 'MIGRATION_PROD',
    }),
    AuthModule,
    QuestionsModule,
    SolutionModule,
    ProgressModule,
    MongooseModule.forFeature(
      [
        { name: BUser.name, schema: BUserSchema, collection: 'users' },
        {
          name: BAllTopicQuestion.name,
          schema: BAllTopicQuestionSchema,
          collection: 'alltopicquestions',
        },
      ],
      'MIGRATION_PROD',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, MigrateService],
})
export class AppModule {}
