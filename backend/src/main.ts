import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// Use require-style import to avoid build-time/esModuleInterop differences in CI (Vercel)
// keep it untyped so the factory call `cookieParser()` is allowed in all TS configs
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parsing
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
