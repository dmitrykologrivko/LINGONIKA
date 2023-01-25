import { Module } from '@nestjs/common';
import { CoreModule } from '@nestjs-boilerplate/core';
import { AuthModule } from '@nestjs-boilerplate/auth';
import { CardModule } from '@card/card.module';
import { LanguageModule } from '@languages/language.module';

@Module({
  imports: [
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    CardModule,
    LanguageModule,
  ],
})
export class AppModule {}
