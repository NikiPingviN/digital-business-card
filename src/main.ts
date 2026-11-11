import 'reflect-metadata';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { prepareDatabase } from './database/prepare-database';

async function bootstrap(): Promise<void> {
  await prepareDatabase();

  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  Logger.log(`Apollo Sandbox is ready at http://localhost:${port}/graphql`, 'Bootstrap');
}

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  Logger.error(message, 'Bootstrap');
  process.exit(1);
});
