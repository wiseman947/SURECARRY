import { PrismaClient } from '@prisma/client';

// Use a singleton pattern to avoid too many DB connections in dev mode
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
