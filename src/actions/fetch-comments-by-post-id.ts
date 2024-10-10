'use server'

import { prisma } from '@/lib/prisma'

export async function fetchCommentsByPostId(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      medias: true,
      Comment: {
        include: {
          user: true,
        },
      },
    },
  })

  return post
}
