'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CloudUpload, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { getUser } from '@/actions/get-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateUser } from '@/actions/update-user'
import { updateBio } from '@/actions/update-bio'

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().max(240).optional(),
})

type FormData = z.infer<typeof formSchema>

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false)

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      bio: data?.bio ?? '',
    },
  })

  async function handleUpdateUser({
    firstName,
    lastName,
    email,
    bio,
  }: FormData) {
    try {
      setIsLoading(true)
      if (!firstName || !lastName || !email || !bio) {
        return
      }

      updateUser(firstName, lastName, email)
      updateBio(bio)

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar o perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full">
      <h1 className="text-3xl font-medium">Configurações</h1>

      <div className="mt-6 flex flex-col flex-wrap">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Informações pessoais</h2>
            <span className="text-sm">
              Atualize suas informações pessoais aqui.
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="mt-6 flex flex-col gap-5 divide-y"
        >
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-form">
            <Label className="text-sm font-medium text-zinc-700">Nome</Label>

            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
              {errors.firstName && (
                <p className="">{errors.firstName.message}</p>
              )}
              <Input type="text" {...register('firstName')} />

              <div className="flex flex-col gap-3 lg:block">
                <Label className="text-sm font-medium lg:sr-only">
                  Sobrenome
                </Label>
                {errors.lastName && (
                  <p className="">{errors.lastName.message}</p>
                )}
                <Input type="text" {...register('lastName')} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            {errors.email && <p className="">{errors.email.message}</p>}
            <Input type="email" {...register('email')} />
          </div>

          <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
              <span className="mt-0.5 block text-sm font-normal text-zinc-500">
                Escreva sobre você.
              </span>
            </label>
            <div className="space-y-3">
              {errors.bio && <p className="">{errors.bio.message}</p>}
              <Textarea
                id="bio"
                rows={6}
                maxLength={240}
                {...register('bio')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
            <label className="text-sm font-medium">
              Foto
              <span className="mt-0.5 block text-sm font-normal text-zinc-500">
                Isso será a sua foto de perfil.
              </span>
            </label>

            <fieldset className="flex items-start gap-3 space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={data?.imageUrl ?? ''} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <label
                htmlFor="photo"
                className="group flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-4 text-center shadow-sm transition-colors hover:border-zinc-600"
              >
                <div className="border-6 rounded-full border-muted-foreground bg-muted p-2 group-hover:border-primary">
                  <CloudUpload className="size-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-muted-foreground group-hover:text-primary">
                      Click aqui para fazer upload
                    </span>
                    <br />
                    ou arraste um arquivo
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PNG, JPEG e SVG
                  </span>
                </div>
              </label>
              <Input
                id="photo"
                type="file"
                accept="image/png image/jpeg image/webp image/jpg video/mp4 video/webm"
                className="sr-only w-fit"
                // {...register('imageUrl')}
              />
            </fieldset>
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} variant="default">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
