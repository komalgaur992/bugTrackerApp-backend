import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.bug.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@bugtracker.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create reporter user
  const reporterPassword = await bcrypt.hash("reporter123", 10);
  const reporter = await prisma.user.create({
    data: {
      name: "John Reporter",
      email: "reporter@bugtracker.com",
      password: reporterPassword,
      role: "REPORTER",
    },
  });

  // Create sample bugs
  const bugs = await prisma.bug.createMany({
    data: [
      {
        title: "Login button not working",
        description: "The login button on the homepage doesn't respond when clicked. This affects all users trying to access the system.",
        severity: "HIGH",
        status: "OPEN",
        reporterId: reporter.id,
      },
      {
        title: "Dashboard loading slowly",
        description: "The dashboard takes more than 5 seconds to load, causing poor user experience.",
        severity: "MEDIUM",
        status: "IN_PROGRESS",
        reporterId: reporter.id,
      },
      {
        title: "Minor UI alignment issue",
        description: "The text in the footer is slightly misaligned on mobile devices.",
        severity: "LOW",
        status: "CLOSED",
        reporterId: admin.id,
      },
      {
        title: "Database connection timeout",
        description: "Occasional database connection timeouts during peak hours causing data loss.",
        severity: "HIGH",
        status: "OPEN",
        reporterId: admin.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
  console.log("📊 Created users:");
  console.log(`   Admin: admin@bugtracker.com / admin123`);
  console.log(`   Reporter: reporter@bugtracker.com / reporter123`);
  console.log(`📝 Created ${bugs.count} sample bugs`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
