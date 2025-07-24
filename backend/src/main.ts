import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Bootstrap, ServeStaticExpressLoader } from '@nestjs-boilerplate/core';
import { NotFoundExceptionFilter } from './shared';
import { AppModule } from './app.module';

async function bootstrap() {
  await new Bootstrap(AppModule).startApplication<NestExpressApplication>({
    onInit: async (container: NestExpressApplication) => {
      container.enableCors();
      container.useGlobalFilters(new NotFoundExceptionFilter());
      // https://docs.nestjs.com/migration-guide#query-parameters-parsing
      container.set('query parser', 'extended');
      return Promise.resolve();
    },
    loaders: [new ServeStaticExpressLoader(join(process.cwd(), 'public'), '')],
  });
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
