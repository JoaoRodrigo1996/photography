'use server'

import { auth } from '@clerk/nextjs/server'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')

const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'video/mp4',
  'video/webm',
]

const allowedFileSize = 1024 * 1024 * 10 // 10MB

export async function getPreSignedURL(
  mimeType: string,
  size: number,
  checkSum: string,
) {
  const { sessionId, userId } = auth()

  if (!sessionId) {
    return {
      failure: 'Not allowed',
    }
  }

  if (!allowedMimeTypes.includes(mimeType)) {
    return { failure: 'Invalid file type!' }
  }

  if (size > allowedFileSize) {
    return { failure: 'This file is to large' }
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  })

  const user_id = user!.id

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: mimeType,
    ContentLength: size,
    ChecksumSHA256: checkSum,
    Metadata: { user_id },
  })

  const preSignedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  })

  const mediaResult = await prisma.media.create({
    data: {
      userId: user_id,
      url: preSignedURL.split('?')[0],
      type: mimeType.startsWith('image') ? 'image' : 'video',
    },
  })

  return {
    success: { url: preSignedURL, mediaId: mediaResult.id },
  }
}
