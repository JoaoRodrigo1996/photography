import { TabItem } from '@/components/tabs/tab-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'

export default function NotificationsPage() {
  return (
    <div className="w-full">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        Inbox
      </h2>
      <Tabs defaultValue="fotos">
        <ScrollArea className="w-full" type="scroll">
          <TabsList className="mt-6 flex w-full items-center gap-4">
            <TabItem value="fotos" title="Atividades" />
            <TabItem value="videos" title="Mensages" />
          </TabsList>

          <TabsContent value="fotos">Atividades</TabsContent>
          <TabsContent value="videos">Mensages</TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
