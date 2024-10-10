import { Home, InboxIcon, Plus, Search, User } from 'lucide-react'
import { UserAvatar } from './user-avatar'
import { CommandMenu } from './command-menu'
import { NavLink } from './nav-link'

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
import { Button } from './ui/button'
import { me } from '@/actions/me'

export async function Header() {
  const user = await me()

  return (
    <>
      <header className="relative z-20 bg-zinc-950 py-1">
        <div className="flex min-h-[--header-row-height] items-center justify-between gap-10">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary">
            <span className="text-xl font-semibold text-secondary">P</span>
          </div>
          <UserAvatar />
        </div>
      </header>

      <div className="sticky top-0 z-20 bg-zinc-950 py-1">
        <div className="min-h-[--header-row-height]' flex items-center justify-between">
          <menu className="flex items-center gap-6">
            <NavLink href="/home">
              <Home className="size-4" /> Página inicial
            </NavLink>
            <NavLink href="/explore">
              <Search className="size-4" />
              Explorar
            </NavLink>
            <NavLink href="/inbox">
              <InboxIcon className="size-4" />
              Inbox
            </NavLink>

            <NavLink href={`/profile/${user?.id}`}>
              <User className="size-4" />
              Perfil
            </NavLink>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 size-4" />
                  Nova postagem
                </Button>
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar uma publicação</DialogTitle>
                    <DialogDescription>
                      Escolha uma foto e preencha o formulário abaixo para criar
                      uma publicação
                    </DialogDescription>
                  </DialogHeader>
                  <PhotographyForm />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </menu>
          <CommandMenu />
        </div>
      </div>
    </>
  )
}
