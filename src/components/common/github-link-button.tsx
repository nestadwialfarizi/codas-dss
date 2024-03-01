import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';

export function GitHubLinkButton() {
  return (
    <Link href='https://github.com/nestadwialfarizi/codas-dss'>
      <Button variant='outline' size='icon'>
        <GitHubLogoIcon className='h-4 w-4' />
      </Button>
    </Link>
  );
}
