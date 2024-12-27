import { BaseLoader } from '@nestjs-boilerplate/core';
import { NestExpressApplication } from '@nestjs/platform-express';

export class CorsLoader extends BaseLoader<NestExpressApplication> {
  async load(container: NestExpressApplication): Promise<void> {
    container.enableCors();
  }
}
