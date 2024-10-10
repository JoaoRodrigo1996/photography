'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function getPosts() {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      medias: true,
      user: true,
      Comment: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: true,
        },
      },
    },
  })

  return posts
}
