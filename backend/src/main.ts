import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Bootstrap, ServeStaticExpressLoader } from '@nestjs-boilerplate/core';
import { NotFoundExceptionFilter } from './shared';
import { AppModule } from './app.module';

async function bootstrap() {
  await new Bootstrap(AppModule).startApplication({
    onInit: async (container: INestApplication) => {
      container.enableCors();
      container.useGlobalFilters(new NotFoundExceptionFilter());
      return Promise.resolve();
    },
    loaders: [new ServeStaticExpressLoader(join(process.cwd(), 'public'), '')],
  });
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
