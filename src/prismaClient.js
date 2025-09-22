import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

globalThis.prisma = globalThis.prisma ?? prismaClientSingleton();

const prisma = globalThis.prisma;

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
