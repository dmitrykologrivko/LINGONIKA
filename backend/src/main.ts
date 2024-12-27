import { Bootstrap } from '@nestjs-boilerplate/core';
import { CorsLoader } from './shared';
import { AppModule } from './app.module';

new Bootstrap(AppModule).startApplication({
  loaders: [new CorsLoader()],
});
