import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { LoadingIndicator } from '~/components/loading-indicator';

export default function SignInPage() {
  return (
    <>
      <ClerkLoading>
        <LoadingIndicator />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn path='/sign-in' />
      </ClerkLoaded>
    </>
  );
}
