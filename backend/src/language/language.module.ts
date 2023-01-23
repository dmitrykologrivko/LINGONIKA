import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';

@Module({
  imports: [],
  controllers: [LanguageController],
})
export class LanguageModule {}
