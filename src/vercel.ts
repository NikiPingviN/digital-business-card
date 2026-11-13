import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { AppModule } from './app.module';
import { prepareDatabase } from './database/prepare-database';

let appPromise: Promise<Express> | undefined;

function getApp(): Promise<Express> {
  appPromise ??= boot().catch((error: unknown) => {
    appPromise = undefined;
    throw error;
  });
  return appPromise;
}

async function boot(): Promise<Express> {
  await prepareDatabase();
  const expressApp = express();
  const app: INestApplication = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  return expressApp;
}

export default function handler(request: Request, response: Response, next: NextFunction): void {
  getApp()
    .then((app) => {
      app(request, response, next);
    })
    .catch((error: unknown) => {
      console.error(error);
      sendPlainError(response, error);
    });
}

function sendPlainError(response: Response, error: unknown): void {
  if (response.headersSent) {
    return;
  }

  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  response.statusCode = 500;
  response.setHeader('content-type', 'text/plain; charset=utf-8');
  response.end(message);
}
