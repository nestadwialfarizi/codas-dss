import { auth } from '@clerk/nextjs/server';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrganizationId() {
  const { orgId, userId } = auth();

  if (!userId) throw new Error('Unauthorized');

  return orgId ?? userId;
}
