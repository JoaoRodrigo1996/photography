import { TabsTrigger } from '../ui/tabs'

interface TabItemProps {
  value: string
  title: string
}

export function TabItem({ value, title }: TabItemProps) {
  return (
    <TabsTrigger value={value}>
      <span className="">{title}</span>
    </TabsTrigger>
  )
}
