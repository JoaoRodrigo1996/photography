import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  MoreHorizontalIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  BookmarkIcon,
} from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import CommentForm from './comment-form'
import { me } from '@/actions/me'
import { useQuery } from '@tanstack/react-query'

interface Posts {
  id: string
  user_id: string
  description: string
  createdAt: Date
  medias: Array<{
    url: string
  }>
  Comment: Array<{
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
  }>
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

interface PostCardProps {
  post: Posts
  setPostId: (postId: string) => void
  openImageModal: () => void
}

export function PostCard({ post, openImageModal, setPostId }: PostCardProps) {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => me(),
  })

  function handleModal(postId: string) {
    openImageModal()
    setPostId(postId)
  }

  if (!user.data) {
    return null
  }

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={post.user.imageUrl ?? ''}
              alt={`$Postagem de {item.user.firstName}`}
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <Link
              href={`/profile/${post.user_id}`}
              className="text-sm font-medium hover:underline hover:underline-offset-2"
            >
              {post.user.firstName} {post.user.lastName}
            </Link>

            <p className="text-xs text-muted-foreground">
              -{' '}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio
          onClick={() => handleModal(post.id)}
          ratio={4 / 3}
          className="relative"
        >
          <Image
            src={post.medias[0].url}
            alt="imagem"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={70}
            priority
            className="aspect-square h-auto object-cover object-center"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <HeartIcon className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => handleModal(post.id)}
              variant="ghost"
              size="sm"
              aria-label="Comment"
            >
              <MessageCircleIcon className="mr-2 h-5 w-5" />
              {post.Comment.length}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-baseline gap-2">
            <div className="flex shrink-0 items-center gap-2">
              <h2 className="text-sm font-semibold">
                {post.user.firstName} {post.user.lastName}
              </h2>
            </div>
            <p className="text-sm">{post.description}</p>
          </div>
        </div>
        {post.Comment.map((comment) => (
          <div key={comment.id} className="flex w-full items-baseline gap-2">
            <div className="flex shrink-0 items-center gap-2">
              <h2 className="text-sm font-semibold">
                {comment.user.firstName} {comment.user.lastName}
              </h2>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))}
        <Separator />
        <CommentForm postId={post.id} userId={user.data.id} />
      </CardFooter>
    </Card>
  )
}
