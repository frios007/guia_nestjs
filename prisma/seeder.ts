import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Universidad Nacional De ingenieria',
      slug: 'uni-nicaragua',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'fabio@email.com',
      username: 'fabio1',
      name: 'Fabio Rios',
      tenantId: tenant.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Mi primer post',
      content: 'Ejemplo de creacion de prisma',
      authorId: user.id,
    },
  });

  console.log('Seeder Correcto');
}

main()
  .catch((e) => {
    console.error('Error en seeder', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
