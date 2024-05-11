import Link from 'next/link';
import { ViewVerticalIcon } from '@radix-ui/react-icons';

import { navItems } from 'src/lib/config';
import { Button } from 'src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';

export function MobileNav() {
  return (
    <div className='md:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <ViewVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {navItems.map((navItem, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={navItem.href}>{navItem.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
