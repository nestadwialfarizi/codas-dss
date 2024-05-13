'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from 'src/lib/config';
import { cn } from 'src/lib/utils';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className='ml-8 hidden space-x-4 md:inline'>
      {navItems.map((navItem, index) => (
        <Link
          key={index}
          href={navItem.href}
          className={cn(
            'text-sm text-muted-foreground hover:text-primary',
            pathname === navItem.href && 'text-primary',
          )}
        >
          {navItem.name}
        </Link>
      ))}
    </nav>
  );
}
