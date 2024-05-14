import Link from 'next/link';
import { ViewVerticalIcon } from '@radix-ui/react-icons';
import { navItems } from '~/lib/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

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
          <DropdownMenuItem asChild>
            <Link href='/docs/criterias'>Panduan</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
