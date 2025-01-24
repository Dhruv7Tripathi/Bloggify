import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// eslint-disable-next-line
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Optional: Logs queries in development mode
  });

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
