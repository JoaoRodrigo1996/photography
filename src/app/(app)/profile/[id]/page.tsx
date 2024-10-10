import Link from 'next/link'
import Image from 'next/image'
import { Pencil, User } from 'lucide-react'
import { fetchPostsByUser } from '@/actions/fetch-posts-by-user'
import { me } from '@/actions/me'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TabItem } from '@/components/tabs/tab-item'
import { Button } from '@/components/ui/button'

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const userData = me()
  const postsData = fetchPostsByUser(params.id)

  const [user, posts] = await Promise.all([userData, postsData])

  return (
    <div className="w-full">
      <div className="flex flex-row items-start gap-4">
        <Avatar className="size-40">
          <AvatarImage src={user.imageUrl ?? ''} />
          <AvatarFallback>
            <User className="size-10" />
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-wide">
              {user?.firstName} {user?.lastName}
            </h2>
            <Link href={`/profile/${params.id}/edit`}>
              <Button size="sm" variant="secondary">
                <Pencil className="mr-2 size-4" /> Editar perfil
              </Button>
            </Link>
          </div>
          <div className="flex gap-4">
            <p className="text-sm">
              {' '}
              <span className="font-bold">4</span> Publicações
            </p>
            <p className="text-sm">
              {' '}
              <span className="font-bold">12k</span> Seguidores
            </p>
            <p className="text-sm">
              Seguindo <span className="font-bold">51</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </div>
      </div>

      <section className="">
        <Tabs defaultValue="fotos">
          <ScrollArea className="w-full" type="scroll">
            <TabsList className="mt-6 flex w-full items-center gap-4">
              <TabItem value="all" title="All" />
              <TabItem value="fotos" title="Fotos" />
              <TabItem value="videos" title="Videos" />
              <TabItem value="save" title="Salvos" />
            </TabsList>
            <TabsContent value="all">Todos</TabsContent>
            <TabsContent value="fotos">
              <div className="grid grid-cols-3 gap-2">
                {posts.length === 0 && <p>vazio</p>}
                {posts.map((post) => (
                  <AspectRatio key={post.id} ratio={4 / 3}>
                    <Image
                      src={post.medias[0].url}
                      alt="imagem"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={70}
                      placeholder="blur"
                      blurDataURL={post.medias[0].url}
                      className="rounded-lg object-cover object-center"
                    />
                  </AspectRatio>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos">videos</TabsContent>
            <TabsContent value="save">Salvos</TabsContent>
          </ScrollArea>
        </Tabs>
      </section>
    </div>
  )
}
