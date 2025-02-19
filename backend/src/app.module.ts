import { Module } from '@nestjs/common';
import { CoreModule, DatabaseModule } from '@nestjs-boilerplate/core';
import { AuthModule } from '@nestjs-boilerplate/auth';
import { CardModule } from '@card/card.module';
import { LanguageModule } from '@language/language.module';
import { ProfileModule } from '@profile/profile.module';
import appConfig from './app.config';
import * as migrations from './migrations';

@Module({
  imports: [
    CoreModule.forRoot({
      imports: [
        DatabaseModule.withMigrations(migrations, {
          cli: `${__dirname}/migrations/!(index)*{.ts,.js}`,
        }),
        DatabaseModule.withConfig(),
      ],
      config: {
        load: [appConfig],
      },
    }),
    AuthModule.forRoot(),
    CardModule,
    LanguageModule,
    ProfileModule,
  ],
})
export class AppModule {}
