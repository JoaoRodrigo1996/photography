import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'
import { User } from 'lucide-react'

interface Comment {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    bio: string | null
    clerkUserId: string
    createdAt: Date
    updatedAt: Date
  }
}

interface PostCommentsListProps {
  comment: Comment
}

export function PostCommentsList({ comment }: PostCommentsListProps) {
  return (
    <ScrollArea className="max-h-[520px]">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={comment.user.imageUrl ?? ''} />
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              <Link
                href="#"
                className="hover:underline hover:underline-offset-2"
              >
                {comment.user.firstName} {comment.user.lastName}
              </Link>
              <span className="ml-1 text-sm text-muted-foreground">
                {comment.content}++
              </span>
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
