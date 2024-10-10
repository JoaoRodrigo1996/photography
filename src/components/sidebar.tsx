'use client'

import { useState } from 'react'
import { Home, Menu, Plus, InboxIcon, Search, User } from 'lucide-react'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { PhotographyForm } from './photography-form'
import { NavLink } from './nav-link'
import { UserAvatar } from './user-avatar'
import { getUser } from '@/actions/get-user'
import { useQuery } from '@tanstack/react-query'

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  })

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <aside
      className={`${isSidebarOpen ? 'w-64' : 'w-22'} flex flex-col border-r p-4 transition-all duration-300 ease-in-out lg:px-5 lg:py-8`}
    >
      <div className="mb-6 flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleSidebar}
          className={`${isSidebarOpen ?? 'mx-auto'}`}
        >
          <Menu className="size-4" />
        </Button>
        {isSidebarOpen && (
          <p className="flex items-center text-xl font-bold tracking-tight">
            <span className="mr-px flex h-7 w-7 items-center justify-center rounded-full bg-primary text-zinc-900">
              P
            </span>
            hotography
          </p>
        )}
      </div>

      <nav
        className={`${isSidebarOpen ? '' : 'items-center'} mt-6 flex flex-col gap-6`}
      >
        <NavLink href="/home">
          <Home className="size-4" />
          {isSidebarOpen && <span>página inicial</span>}
        </NavLink>

        <NavLink href="/explore">
          <Search className="size-4" />
          {isSidebarOpen && <span>Explorar</span>}
        </NavLink>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground`}
            >
              <Plus className="size-4" />
              {isSidebarOpen && <span>Criar</span>}
            </button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar uma publicação</DialogTitle>
                <DialogDescription>
                  Escolha uma foto e preencha o formulário abaixo para criar uma
                  publicação
                </DialogDescription>
              </DialogHeader>
              <PhotographyForm />
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <NavLink href="/inbox">
          <InboxIcon className="size-4" />
          {isSidebarOpen && <span>Inbox</span>}
        </NavLink>

        <NavLink href={`/profile/${user?.id}`}>
          <User className="size-4" />
          {isSidebarOpen && <span>Perfil</span>}
        </NavLink>
      </nav>

      <div className={`${isSidebarOpen ? 'mt-auto' : 'mx-auto mt-auto'}`}>
        <UserAvatar />
      </div>
    </aside>
  )
}
