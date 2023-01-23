import { Module } from '@nestjs/common';
import { CoreModule } from '@nestjs-boilerplate/core';
import { AuthModule } from '@nestjs-boilerplate/auth';
import { LanguageModule } from '@languages/language.module';

@Module({
  imports: [CoreModule.forRoot(), AuthModule.forRoot(), LanguageModule],
})
export class AppModule {}
