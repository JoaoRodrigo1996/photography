import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (error) {
    console.error('Error verifying webhook', error)
    return new Response('Error occured', { status: 400 })
  }

  const eventType = event.type

  switch (eventType) {
    case 'user.created':
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data
      await prisma.user.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        },
      })
      break

    case 'user.updated':
      const {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email_addresses: email,
      } = event.data

      await prisma.user.update({
        where: { clerkUserId: userId },
        data: {
          firstName,
          lastName,
          email: email[0].email_address,
        },
      })
      break

    default:
      break
  }

  return new Response('', { status: 200 })
}
