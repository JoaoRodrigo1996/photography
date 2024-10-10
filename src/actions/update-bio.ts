'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function updateBio(bio: string) {
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

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      bio,
    },
  })

  revalidatePath('/settings')
}
