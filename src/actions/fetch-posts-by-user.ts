'use server'

import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const fetchPostsByUser = unstable_cache(
  async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const posts = await prisma.post.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        medias: true,
      },
    })

    return posts
  },
  ['posts'],
  {
    revalidate: 3600,
    tags: ['posts'],
  },
)
