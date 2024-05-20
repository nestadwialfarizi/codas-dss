import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs';
import { LoadingIndicator } from '~/components/loading-indicator';

export default function SignUpPage() {
  return (
    <>
      <ClerkLoading>
        <LoadingIndicator />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp path='/sign-up' />
      </ClerkLoaded>
    </>
  );
}
