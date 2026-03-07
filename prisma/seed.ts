import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  /* -------------------- Status -------------------- */
  const statuses = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
    { id: 3, name: 'Deleted' },
  ]

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    })
  }

  /* -------------------- Categories -------------------- */
  const categories = [
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'UX' },
    { id: 4, name: 'Startup' },
    { id: 5, name: 'Writing' },
    { id: 6, name: 'Psychology' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: {
        ...category,
        statusId: 1,
      },
    })
  }

  /* -------------------- Demo User -------------------- */
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@medium.local' },
    update: {},
    create: {
      email: 'demo@medium.local',
      username: 'demoauthor',
      password: 'Pass@word123',
      name: 'Demo Author',
      statusId: 1,
    },
  })

  /* -------------------- Reset Articles -------------------- */
  await prisma.article.deleteMany({
    where: { authorId: demoUser.id },
  })

  /* -------------------- Demo Articles -------------------- */
  const articles = [
    {
      title: 'The Future of Human-Computer Interaction in 2025',
      content: `
        <p>As AI systems become more capable, the relationship between humans and computers is evolving in unexpected ways.</p>
        <p>This article explores the trends shaping our digital future. From voice interfaces to ambient computing, we are moving toward a world where technology fades into the background.</p>
      `,
    },
    {
      title: 'The Last Programmer — A Short Story About AI',
      content: `
        <p>Artificial intelligence is no longer a distant dream.</p>
        <p>It is here, and it is changing how we work, create, and connect.</p>
      `,
    },
    {
      title: 'Building a Medium Clone with Next.js and Prisma',
      content: `
        <p>Learn how to build a blog platform similar to Medium using Next.js 16, Prisma, and Tailwind CSS.</p>
        <p>We will cover authentication, article CRUD, and a responsive feed layout.</p>
      `,
    },
  ]

  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        authorId: demoUser.id,
        statusId: 1,
      },
    })
  }

  console.log('🌱 Database seeded successfully')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })