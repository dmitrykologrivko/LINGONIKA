import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Bootstrap, ServeStaticExpressLoader } from '@nestjs-boilerplate/core';
import { NotFoundExceptionFilter } from './shared';
import { AppModule } from './app.module';

new Bootstrap(AppModule).startApplication({
  onInit: async (container: INestApplication) => {
    container.enableCors();
    container.useGlobalFilters(new NotFoundExceptionFilter());
  },
  loaders: [new ServeStaticExpressLoader(join(process.cwd(), 'public'), '')],
});
