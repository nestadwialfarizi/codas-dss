import { auth } from '@clerk/nextjs/server';
import { createTRPCReact } from '@trpc/react-query';
import { TRPCError } from '@trpc/server';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Router } from '~/server/routers';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trpc = createTRPCReact<Router>();

export function getErrorMessage(error: unknown) {
  const trpcError = error as TRPCError;
  return trpcError.message;
}

export function getOrganizationId() {
  const { orgId, userId } = auth();

  if (!userId) throw new Error('Unauthorized');

  return orgId ?? userId;
}
export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
