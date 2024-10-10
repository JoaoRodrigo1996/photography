'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'

import { me } from '@/actions/me'
import { fetchCommentsByPostId } from '@/actions/fetch-comments-by-post-id'
import { AspectRatio } from './ui/aspect-ratio'
import CommentForm from './comment-form'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface ImageModalProps {
  postId: string
  setPostId: (postId: string) => void
  closeImageModal: () => void
}

export function ImageModal({
  postId,
  closeImageModal,
  setPostId,
}: ImageModalProps) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['comment'],
    queryFn: () => fetchCommentsByPostId(postId),
  })

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => me(),
  })

  function handleCloseModal() {
    closeImageModal()
    setPostId('')
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div className="relative flex w-[880px] gap-5 space-y-5 rounded-xl bg-zinc-950 px-6 py-5">
            <div className="flex-1">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-48" />
                </div>
                <Skeleton className="h-px w-full" />
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Separator />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="absolute right-4 top-2">
              <Skeleton className="size-10 rounded-md" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      >
        <div className="relative flex w-[880px] gap-5 space-y-5 rounded-xl bg-zinc-950 px-6 py-5">
          <div className="flex-1">
            <AspectRatio>
              <Image
                src={post?.medias[0].url || ''}
                alt={post?.description || ''}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={100}
                className="aspect-square h-auto object-cover object-center"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium">Comentários</p>
                <p className="text-sm">{post?.Comment.length}</p>
              </div>
              <Separator />
              {post?.Comment.map((comment) => (
                <div key={comment.id} className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Separator />
              <CommentForm postId={post?.id || ''} userId={user?.id || ''} />
            </div>
          </div>
          <div className="absolute right-4 top-2">
            <Button size="sm" variant="ghost" onClick={handleCloseModal}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
