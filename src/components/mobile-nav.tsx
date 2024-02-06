'use client';

import { ViewVerticalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { navItems } from '~/lib/config';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function MobileNav() {
  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <ViewVerticalIcon className='h-4 w-4' />
            <span className='sr-only'>Navigations</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {navItems.map(({ name, href }) => (
            <DropdownMenuItem key={name} asChild>
              <Link href={href}>{name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
