
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

async function main() {
  await prisma.status.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Active' },
  })

  await prisma.status.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Inactive' },
  })

  await prisma.status.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: 'Deleted' },
  })

  const categories = [
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'UX' },
    { id: 4, name: 'Startup' },
    { id: 5, name: 'Writing' },
    { id: 6, name: 'Psychology' },
  ]

  for (const { id, name } of categories) {
    await prisma.category.upsert({
      where: { id },
      update: { name },
      create: { id, name, statusId: 1 },
    })
  }

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

  await prisma.article.deleteMany({ where: { authorId: demoUser.id } })

  const articles = [
    {
      title: 'The Future of Human-Computer Interaction in 2025',
      content: '<p>...</p>',
    },
    {
      title: 'The Last Programmer — A Short Story About AI',
      content: '<p>...</p>',
    },
    {
      title: 'Building a Medium Clone with Next.js and Prisma',
      content: '<p>...</p>',
    },
  ]

  for (const { title, content } of articles) {
    await prisma.article.create({
      data: { title, content, authorId: demoUser.id, statusId: 1 },
    })
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })