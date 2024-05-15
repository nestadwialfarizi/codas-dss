import { useAuth } from '@clerk/nextjs';

export function useIsAdmin() {
  const { userId, orgId, orgRole } = useAuth();

  const isPersonal = userId && !orgId;
  const isOrganizationAdmin = orgId && orgRole === 'org:admin';

  return (isPersonal || isOrganizationAdmin) as boolean;
}
