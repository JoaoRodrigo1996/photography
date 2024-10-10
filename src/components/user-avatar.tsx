'use client'

import { User } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getUser } from '@/actions/get-user'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import { useClerk } from '@clerk/nextjs'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function UserAvatar() {
  const { signOut } = useClerk()
  const router = useRouter()
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 overflow-hidden">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="">
            <AvatarImage src={user?.imageUrl ?? ''} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {user?.firstName} {user?.lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`#`)}>
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
