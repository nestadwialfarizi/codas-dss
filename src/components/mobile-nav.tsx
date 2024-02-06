'use client';

import { ViewVerticalIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';

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
      </DropdownMenu>
    </div>
  );
}
