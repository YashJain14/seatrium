// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` in development to prevent hot-reloading issues.
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
