import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export function GitHubLinkButton() {
  return (
    <Link href='https://github.com/nestadwialfarizi/codas-dss' target='_blank'>
      <Button variant='outline' size='icon'>
        <GitHubLogoIcon className='h-4 w-4' />
      </Button>
    </Link>
  );
}
