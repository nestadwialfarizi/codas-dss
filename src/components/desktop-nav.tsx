'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from 'src/lib/utils';
import { navItems } from 'src/lib/config';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className='hidden space-x-4 md:flex'>
      {navItems.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={cn(
            'text-sm text-muted-foreground hover:text-primary',
            pathname === href && 'text-primary',
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
