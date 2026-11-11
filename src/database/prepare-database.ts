import { Logger } from '@nestjs/common';
import { execFileSync } from 'node:child_process';
import { Client } from 'pg';
import { createPrismaClient } from '../prisma/create-prisma-client';
import { seedProfile } from './seed';

const logger = new Logger('Database');

export async function prepareDatabase(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  await waitForDatabase(connectionString);

  logger.log('Applying migrations');
  execFileSync('npx', ['--no-install', 'prisma', 'migrate', 'deploy'], {
    stdio: 'inherit',
    env: {
    ...process.env,
    PRISMA_HIDE_UPDATE_MESSAGE: '1',
  },
  });

  const prisma = createPrismaClient();
  try {
    logger.log('Seeding profile');
    await seedProfile(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

async function waitForDatabase(connectionString: string): Promise<void> {
  const attempts = 30;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const client = new Client({ connectionString });
    try {
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      return;
    } catch (error) {
      await client.end().catch(() => undefined);
      if (attempt === attempts) {
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`Database is not reachable: ${reason}`);
      }
      await delay(1000);
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
