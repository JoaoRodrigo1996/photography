'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

interface CreatePostProps {
  description: string
  mediaId: string
}

export async function createPost({ description, mediaId }: CreatePostProps) {
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

  const post = await prisma.post.create({
    data: {
      description,
      user: { connect: { id: user.id } },
      medias: { connect: { id: mediaId } },
    },
    include: {
      medias: true,
    },
  })

  revalidatePath('/home')
  return post
}
