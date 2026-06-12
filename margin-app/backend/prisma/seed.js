const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@margin.com' },
    update: {},
    create: {
      email: 'demo@margin.com',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0scG3LQ5JG',
      businessName: 'متجر ربح للتجارة',
      sector: 'تجارة عامة',
      businessAge: 5,
      location: 'بغداد',
      phone: '+9647701234567',
      subscriptionTier: 'premium',
      reportCount: 0,
      maxReports: 100
    }
  });

  console.log('Seed completed! Created demo user:', demoUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });