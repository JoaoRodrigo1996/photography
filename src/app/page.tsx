import { Button } from '@/components/ui/button'
import { Image as ImageIcon } from 'lucide-react'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <ImageIcon className="h-6 w-6" />
          <span className="sr-only">Acme Gallery</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Recursos
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Preços
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Sobre
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contato
          </Link>
          <Link href="/sign-in">
            <Button size="sm">Entrar</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Suas Fotos, Sua História
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Exiba suas memórias, compartilhe sua criatividade e explore
                  galerias deslumbrantes com nosso aplicativo de galeria
                  intuitivo e poderoso.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/sign-up">
                  <Button>Começar</Button>
                </Link>
                <p className="text-xs">
                  Inicie seu período de teste gratuito. Não é necessário cartão
                  de crédito.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs">
          © 2024 Galeria Acme. Todos os direitos reservados.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}
