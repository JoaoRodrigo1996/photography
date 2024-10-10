import { TabItem } from '@/components/tabs/tab-item'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'

export default function ExplorePage() {
  return (
    <div className="w-full">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        Explorar
      </h2>

      <Tabs defaultValue="for-you">
        <ScrollArea className="w-full" type="scroll">
          <TabsList className="mt-6 flex w-full items-center gap-4">
            <TabItem value="for-you" title="Para você" />
            <TabItem value="cars" title="Carros" />
            <TabItem value="design" title="Design" />
            <TabItem value="art" title="Artes" />
          </TabsList>
          <TabsContent value="for-you">Para você</TabsContent>
          <TabsContent value="cars">Carros</TabsContent>
          <TabsContent value="design">Design</TabsContent>
          <TabsContent value="art">Artes</TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
