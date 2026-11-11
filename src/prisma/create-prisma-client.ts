import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

export function createPrismaAdapter(): PrismaPg {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  return new PrismaPg({ connectionString });
}

export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    adapter: createPrismaAdapter(),
  });
}
