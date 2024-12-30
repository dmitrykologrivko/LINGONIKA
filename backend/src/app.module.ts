import { Module } from '@nestjs/common';
import { CoreModule } from '@nestjs-boilerplate/core';
import { AuthModule } from '@nestjs-boilerplate/auth';
import { CardModule } from '@card/card.module';
import { LanguageModule } from '@languages/language.module';
import { ProfileModule } from '@profile/profile.module';

@Module({
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    CardModule,
    LanguageModule,
    ProfileModule,
  ],
})
export class AppModule {}
