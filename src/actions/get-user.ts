'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function getUser() {
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
    return null
  }

  return user
}
