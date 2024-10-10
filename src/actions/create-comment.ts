'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface CreateCommentProps {
  content: string
  userId: string
  postId: string
}

export async function createComment({
  content,
  userId,
  postId,
}: CreateCommentProps) {
  const comment = await prisma.comment.create({
    data: {
      content,
      user_id: userId,
      post_id: postId,
    },
  })

  revalidatePath('/home')
  return comment
}
