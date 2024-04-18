import { PrismaClient, Prisma } from "@prisma/client";
import { links } from "../data/links";

const prisma = new PrismaClient();

async function main() {
  // Try to find a user with the provided email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "test@gmail.com",
    },
  });

  // If the user doesn't exist, create it
  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: "test@gmail.com",
        role: "ADMIN",
      },
    });
  }

  // Create links
  await prisma.link.createMany({
    data: links,
    skipDuplicates: true, // Skip creating links that already exist
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
