import { auth } from '@clerk/nextjs/server';
import { createTRPCReact } from '@trpc/react-query';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import type { Router } from '~/server/router';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trpc = createTRPCReact<Router>();

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

export function toastSuccess(description?: string) {
  toast.success('Yeah, berhasil!', { description });
}

export function toastError(description?: string) {
  toast.success('Oops, terjadi kesalahan!', { description });
}
