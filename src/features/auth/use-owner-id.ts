import { useAuth } from '@clerk/nextjs';

export function useOwnerId() {
  const { orgId, userId } = useAuth();

  return orgId ?? userId;
}
