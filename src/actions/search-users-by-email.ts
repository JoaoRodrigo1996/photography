'use server'

import { prisma } from '@/lib/prisma'

export async function searchUsersByEmail(email: string) {
  const users = await prisma.user.findMany({
    where: {
      email,
    },
  })

  return users
}
