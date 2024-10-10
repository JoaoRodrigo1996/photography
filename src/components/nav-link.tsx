'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const navLink = tv({
  base: 'flex items-center gap-2 text-sm rounded-md font-medium text-muted-foreground hover:underline hover:underline-offset-2',

  variants: {
    isActive: {
      true: 'text-accent-foreground underline-offset-2 underline',
    },
  },
})

type NavLinkVariants = VariantProps<typeof navLink>

interface NavLinkProps extends NavLinkVariants {
  href: string
  children: ReactNode
}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={props.href}
      className={navLink({ isActive: pathname === props.href })}
    >
      {props.children}
    </Link>
  )
}
