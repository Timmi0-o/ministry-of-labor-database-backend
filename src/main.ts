import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFilters } from './filters/ResponseFilters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalFilters(new ResponseFilters());
  await app.listen(process.env.PORT, () =>
    console.log(`SERVER START ON PORT ${process.env.PORT}`),
  );
}
bootstrap();
