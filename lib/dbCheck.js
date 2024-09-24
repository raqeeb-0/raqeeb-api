import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function dbCheck() {
  try {
    await prisma.user.findMany();
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Failed to connect to the database.');
  }
}


export { dbCheck }
