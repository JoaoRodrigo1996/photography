'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'

import { getPosts } from '@/actions/get-posts'
import { Skeleton } from './ui/skeleton'
import { PostCard } from './post-card'
import { ImageModal } from './image-modal'

export function PhotographyList() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [postId, setPostId] = useState<string>('')

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  const openImageModal = () => {
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
  }

  if (posts.isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="max-w-[768px]">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-32 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              </div>
              <div className="">
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
            <div className="h-[576px]">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="flex flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.error) {
    return <div>Error: {posts.error.message}</div>
  }

  return (
    <>
      <AnimatePresence>
        {posts.data?.map((post) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            key={post.id}
            className="space-y-4"
          >
            <PostCard
              post={post}
              openImageModal={openImageModal}
              setPostId={setPostId}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isImageModalOpen && (
        <ImageModal
          postId={postId}
          closeImageModal={closeImageModal}
          setPostId={setPostId}
        />
      )}
    </>
  )
}
