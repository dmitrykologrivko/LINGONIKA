import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Bootstrap, ServeStaticExpressLoader } from '@nestjs-boilerplate/core';
import { NotFoundExceptionFilter, CorsLoader } from './shared';
import { AppModule } from './app.module';

new Bootstrap(AppModule).startApplication({
  onInit: async (container: INestApplication) => {
    container.useGlobalFilters(new NotFoundExceptionFilter());
  },
  loaders: [
    new CorsLoader(),
    new ServeStaticExpressLoader(join(process.cwd(), 'public'), ''),
  ],
});
