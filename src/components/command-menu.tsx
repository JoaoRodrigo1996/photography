'use client'

import { Input } from './ui/input'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { ChangeEvent, useEffect, useState } from 'react'
import { searchUsersByEmail } from '@/actions/search-users-by-email'
import Link from 'next/link'

interface User {
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

export function CommandMenu() {
  const [email, setEmail] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setEmail(event.target.value)
  }

  useEffect(() => {
    searchUsersByEmail(email).then((res) => setUsers(res))
  }, [email])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Buscar
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Buscar...</DialogTitle>
        <Input placeholder="Buscar" onChange={onSearchInputChange} />
        <Separator />

        {users.map((user) => (
          <div key={user.id} className="">
            <Link href={`/profile/${user.id}`} className="">
              {user.firstName}
            </Link>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
