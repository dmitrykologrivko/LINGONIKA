import { Module } from '@nestjs/common';
import { CoreModule } from '@nestjs-boilerplate/core';
import { AuthModule } from '@nestjs-boilerplate/auth';
@Module({
  imports: [
      CoreModule.forRoot(),
      AuthModule.forRoot(),
  ],
})
export class AppModule {}
