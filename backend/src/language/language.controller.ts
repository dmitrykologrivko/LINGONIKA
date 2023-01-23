import { Get, UseGuards } from '@nestjs/common';
import { ApiController } from '@nestjs-boilerplate/core';
import { JwtAuthGuard } from '@nestjs-boilerplate/auth';
import { Languages } from './language.constants';

@UseGuards(JwtAuthGuard)
@ApiController('languages')
export class LanguageController {
  @Get()
  getLanguages() {
    return Object.keys(Languages).map((key) => ({
      code: key,
      name: Languages[key],
    }));
  }
}
