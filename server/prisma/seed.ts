import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 100 }).map((_, index) => ({
    name: `John ${index}`,
    email: `email${index}@gmail.com`,
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('Seed completed: 100 users created');
}

main()
  .catch((e) => {
    console.error('Seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
