'use client'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { createComment } from '@/actions/create-comment'
import { CornerDownLeft } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Comment {
  content: string
  userId: string
  postId: string
}

interface CommentFormProps {
  userId: string
  postId: string
}

const commentSchema = z.object({
  content: z.string(),
})

type CommentSchemaFormData = z.infer<typeof commentSchema>

export default function CommentForm({ userId, postId }: CommentFormProps) {
  const { register, handleSubmit, reset } = useForm<CommentSchemaFormData>({
    resolver: zodResolver(commentSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createCommentFn } = useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      queryClient.setQueryData(['comment'], (comment: Comment[]) => {
        return comment ? [...comment, newComment] : [newComment]
      })
    },
  })

  function handleAddComment({ content }: CommentSchemaFormData) {
    try {
      createCommentFn({ userId, postId, content })
      reset()
      toast.success('Sucesso ao adicionar um comentário!')
    } catch (error) {
      toast.error('Falha ao adicionar um comentário')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddComment)}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Label htmlFor="message" className="sr-only">
        Comentário
      </Label>
      <Input
        id="message"
        placeholder="Deixe aqui o seu comentário..."
        className="w-full border-0 shadow-none placeholder:text-ellipsis focus-visible:ring-0"
        {...register('content')}
      />
      <Button type="submit" size="icon" variant="ghost">
        <CornerDownLeft className="size-4" />
      </Button>
    </form>
  )
}
