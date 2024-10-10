'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function updateUser(
  firstName: string,
  lastName: string,
  email: string,
) {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const params = {
    firstName,
    lastName,
    email,
  }

  const userUpdated = await clerkClient.users.updateUser(userId, params)

  if (!userUpdated) {
    throw new Error('Failed to update user')
  }

  revalidatePath('/settings')
}
